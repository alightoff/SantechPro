'use client';

import Link from 'next/link';
import { useShopStore } from '@/lib/store';
import { ShoppingCart, Heart } from 'lucide-react';

export default function Header() {
  const { cart, wishlist } = useShopStore();

  return (
    <header className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Сантехника PRO
        </Link>

        <nav className="flex items-center space-x-8">
          <Link href="/catalog" className="hover:underline">Каталог</Link>
          <Link href="/cart" className="flex items-center gap-1 hover:underline">
            <ShoppingCart size={20} />
            Корзина ({cart.reduce((sum, i) => sum + i.quantity, 0)})
          </Link>
          <Link href="/wishlist" className="flex items-center gap-1 hover:underline">
            <Heart size={20} />
            Отложенное ({wishlist.length})
          </Link>
          <Link href="/contacts">Контакты</Link>
        </nav>
      </div>
    </header>
  );
}