'use client';

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
    alert('Produto adicionado ao carrinho!'); // Substituiremos isso no passo 2
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
        </div>

        {/* Lado das Informações */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:underline">Home</Link> / Produtos / {product.name}
          </nav>
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">{product.description}</p>
          
          <div className="text-4xl font-black text-black mb-8">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors"
            >
              Adicionar ao Carrinho
            </button>
            <Link 
              href="/cart"
              className="flex-1 bg-gray-100 text-black px-8 py-4 rounded-xl font-bold text-lg text-center hover:bg-gray-200 transition-colors"
            >
              Ver Carrinho
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
