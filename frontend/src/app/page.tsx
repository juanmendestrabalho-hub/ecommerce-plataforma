'use client';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';

export default function CartPage() {
  const { items, removeItem } = useCartStore();
  const [loading, setLoading] = useState(false);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout/create-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ productId: i.id, quantity: i.quantity }))
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redireciona para o gateway seguro
      }
    } catch (error) {
      console.error("Erro no checkout", error);
      alert("Falha ao iniciar pagamento.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) return <div className="p-10 text-center text-gray-500">Seu carrinho está vazio.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6">Carrinho de Compras</h1>
      <div className="divide-y divide-gray-200">
        {items.map(item => (
          <div key={item.id} className="py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-500">Qtd: {item.quantity}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold">R$ {(item.price * item.quantity).toFixed(2)}</span>
              <button onClick={() => removeItem(item.id)} className="text-red-500 hover:underline">Remover</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t pt-6 text-right">
        <p className="text-2xl font-bold mb-4">Total: R$ {total.toFixed(2)}</p>
        <button 
          onClick={handleCheckout} 
          disabled={loading}
          className="bg-black text-white px-8 py-3 rounded-md font-semibold text-lg hover:bg-gray-800 transition w-full md:w-auto"
        >
          {loading ? 'Processando...' : 'Finalizar Compra Segura'}
        </button>
      </div>
    </div>
  );
}
