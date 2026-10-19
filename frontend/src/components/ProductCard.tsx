'use client';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Imagem clicável levando para a página do produto */}
      <Link href={`/product/${product.id}`} className="relative h-56 overflow-hidden block">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        {/* Título clicável */}
        <Link href={`/product/${product.id}`}>
          <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 hover:text-blue-600 transition-colors">
            {product.name}
          </h2>
        </Link>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-extrabold text-black">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          <button 
            onClick={handleAddToCart}
            className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 active:scale-95 transition-all"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
