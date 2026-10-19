'use client';

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, removeItem, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Evita erros de hidratação do Next.js ao usar o LocalStorage
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Calcula o valor total do carrinho
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Como o Back-end e o Stripe ainda não estão ligados, 
    // vamos simular o redirecionamento para o gateway de pagamento.
    toast.loading('A preparar o pagamento seguro...', { duration: 2000 });
    
    setTimeout(() => {
      // Simula o regresso do Stripe para a nossa página de sucesso
      window.location.href = '/success?session_id=SIMULACAO_LOCAL_123';
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-20 text-center bg-white p-12 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">O seu carrinho está vazio</h2>
        <p className="text-gray-500 mb-8">Parece que ainda não adicionou nenhum produto.</p>
        <Link 
          href="/" 
          className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
        >
          Continuar a Comprar
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">O seu Carrinho</h1>
      
      <div className="lg:flex gap-8">
        {/* Lista de Produtos */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {items.map((item) => (
                <li key={item.id} className="p-6 flex items-center gap-6 sm:gap-8 hover:bg-gray-50 transition-colors">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl border border-gray-100"
                  />
                  <div className="flex-grow">
                    <Link href={`/product/${item.id}`} className="hover:text-blue-600 transition-colors">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{item.name}</h3>
                    </Link>
                    <p className="text-gray-500 mt-1">Quantidade: <span className="font-semibold text-black">{item.quantity}</span></p>
                    <div className="text-lg font-extrabold mt-2 text-black">
                      € {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      removeItem(item.id);
                      toast.error('Produto removido.');
                    }}
                    className="text-red-500 font-semibold p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between">
              <button 
                onClick={() => {
                  clearCart();
                  toast.error('Carrinho esvaziado.');
                }}
                className="text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors"
              >
                Esvaziar Carrinho
              </button>
            </div>
          </div>
        </div>

        {/* Resumo da Encomenda */}
        <div className="lg:w-1/3 mt-8 lg:mt-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Resumo da Encomenda</h2>
            
            <div className="flex justify-between text-gray-600 mb-4">
              <span>Subtotal</span>
              <span className="font-semibold text-black">€ {total.toFixed(2).replace('.', ',')}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-6 pb-6 border-b border-gray-100">
              <span>Portes de Envio</span>
              <span className="text-green-600 font-bold">Grátis</span>
            </div>
            
            <div className="flex justify-between text-xl font-extrabold text-gray-900 mb-8">
              <span>Total</span>
              <span>€ {total.toFixed(2).replace('.', ',')}</span>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
            >
              {isCheckingOut ? 'A processar...' : 'Finalizar Compra'}
            </button>
            
            <p className="text-xs text-center text-gray-400 mt-4">
              Ambiente de teste. O pagamento será simulado localmente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
