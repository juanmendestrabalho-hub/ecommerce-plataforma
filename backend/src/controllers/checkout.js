import express from 'express';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const prisma = new PrismaClient();

// Rota de criação de sessão de checkout (Carrinho -> Pagamento)
router.post('/create-session', async (req, res) => {
  const { items } = req.body; // items = [{ productId, quantity }]
  
  try {
    // 1. Validar preços no Back-end (Nunca confiar no Front-end)
    const line_items = [];
    let orderTotal = 0;
    
    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ error: "Produto esgotado ou inválido." });
      }
      
      orderTotal += product.price * item.quantity;
      line_items.push({
        price_data: {
          currency: 'brl',
          product_data: {
            name: product.name,
            images: [product.imageUrl],
          },
          unit_amount: Math.round(product.price * 100), // Stripe usa centavos
        },
        quantity: item.quantity,
      });
    }

    // 2. Criar o pedido PENDENTE no banco
    const order = await prisma.order.create({
      data: {
        total: orderTotal,
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: line_items.find(l => l.quantity === item.quantity).price_data.unit_amount / 100
          }))
        }
      }
    });

    // 3. Gerar link de pagamento seguro do Stripe (Anti-fraude nativo do gateway)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'boleto'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      client_reference_id: order.id,
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: "Erro ao processar checkout." });
  }
});

export default router;
