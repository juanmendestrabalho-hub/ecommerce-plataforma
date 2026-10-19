import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import authRoutes from './controllers/auth.js';
import checkoutRoutes from './controllers/checkout.js';
import productRoutes from './controllers/products.js';

const app = express();
const prisma = new PrismaClient();

// Cibersegurança: Ocultar headers, proteger contra XSS e Clickjacking
app.use(helmet()); 

// Cibersegurança: Prevenir DDoS e Brute Force (Máx 100 reqs por 15 min)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: "Muitas requisições deste IP, tente novamente mais tarde."
});
app.use(limiter);

// Configuração de CORS rígida para o Front-end oficial
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true, // Permite envio de cookies HttpOnly
}));

// Webhook do Stripe precisa do raw body, então express.json vem depois para as rotas normais
app.use('/api/checkout/webhook', express.raw({type: 'application/json'}));

app.use(express.json());
app.use(cookieParser());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/checkout', checkoutRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando protegido na porta ${PORT}`));
