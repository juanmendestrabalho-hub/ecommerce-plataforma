'use client';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { items } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // Evita erros de hidratação no Next.js ao usar o LocalStorage (Zustand persist)
  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-black text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          🛍️ Minha Loja
        </Link>
        <Link href="/cart" className="flex items-center gap-2 hover:text-gray-300 transition">
          <span className="font-medium">Carrinho</span>
          {mounted && totalItems > 0 && (
            <span className="bg-white text-black rounded-full px-2 py-0.5 text-xs font-bold">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
