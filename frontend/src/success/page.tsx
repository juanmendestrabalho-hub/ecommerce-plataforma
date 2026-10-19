'use client';

import { useEffect, Suspense } from 'react';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id'); // Captura o ID do Stripe na URL
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    // Esvazia o carrinho de compras mal a página seja carregada
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-2xl mx-auto mt-20 p-8 bg-white rounded-2xl shadow-sm text-center border border-gray-100">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
        ✓
      </div>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Pagamento Confirmado!</h1>
      <p className="text-gray-600 text-lg mb-6">
        Obrigado pela sua encomenda. O seu pagamento foi processado com sucesso.
      </p>
      
      {/* Mostra o ID da transação se ele vier na URL (ex: ?session_id=123) */}
      {sessionId && (
        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <p className="text-sm text-gray-500 font-semibold mb-1">ID da Transação:</p>
          <p className="text-xs text-gray-400 break-all">{sessionId}</p>
        </div>
      )}

      <Link
        href="/"
        className="inline-block bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
      >
        Voltar para a Loja
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    // O Suspense é necessário no Next.js ao usar useSearchParams()
    <Suspense fallback={<div className="text-center mt-20 text-gray-500">A carregar os detalhes da encomenda...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
