'use client';

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import toast from 'react-hot-toast';

// Como ainda não temos o banco de dados, repetimos o mock de produtos aqui temporariamente.
// No futuro, isso fará um fetch na nossa API do back-end.
const mockProducts = [
  { id: '1', name: 'Tênis Esportivo Runner X', description: 'Tênis de alta performance para corridas e treinos diários. Leve e super confortável. Possui tecnologia de absorção de impacto avançada e cabedal respirável.', price: 299.90, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' },
  { id: '2', name: 'Camiseta Básica Premium', description: 'Camiseta 100% algodão egípcio. Caimento perfeito e durabilidade para o dia a dia. Costuras reforçadas e tecido que não desbota após as lavagens.', price: 89.90, imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80' },
  { id: '3', name: 'Mochila Urbana Impermeável', description: 'Mochila resistente à água com compartimento anti-furto para notebook até 15 polegadas. Ideal para o trabalho, faculdade ou viagens curtas. Design ergonômico.', price: 159.90, imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80' },
  { id: '4', name: 'Smartwatch Fit Pro', description: 'Relógio inteligente com monitoramento cardíaco, oxímetro e bateria que dura até 14 dias. Sincroniza com Android e iOS. Pulseira de silicone hipoalergênico.', price: 349.50, imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80' }
];

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const addItem = useCartStore((state) => state.addItem);
  
  // Busca o produto pelo ID
  const product = mockProducts.find((p) => p.id === params.id);

  // Se o usuário digitar um ID que não existe, mostra a página de erro 404
  if (!product) {
    return notFound();
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
    
    // Notificação visual moderna e elegante substituindo o alert()
    toast.success('Produto adicionado ao carrinho com sucesso!');
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">
      <div className="md:flex">
        {/* Lado da Imagem */}
        <div className="md:w-1/2">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-[400px] md:h-full object-cover"
          />
