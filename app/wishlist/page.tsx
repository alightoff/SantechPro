// app/wishlist/page.tsx
'use client';

import { useShopStore } from '@/lib/store';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, moveToCartFromWishlist, clearWishlist } = useShopStore();
  const [cleared, setCleared] = useState(false);

  const handleClear = () => {
    if (window.confirm('Очистить весь список отложенных товаров?')) {
      clearWishlist();
      setCleared(true);
    }
  };

  if (cleared || wishlist.length === 0) {
    return (
      <div className="py-12 text-center">
        <Heart className="mx-auto text-gray-400" size={80} strokeWidth={1.5} />
        <h2 className="text-2xl font-bold mt-6 mb-3">Список отложенного пуст</h2>
        <p className="text-gray-600 mb-8">Добавляйте товары, которые хотите купить позже</p>
        <Link
          href="/catalog"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 text-lg"
        >
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Отложенные товары</h1>
        <button
          onClick={handleClear}
          className="text-red-600 hover:text-red-800 flex items-center gap-2 text-sm font-medium"
        >
          <Trash2 size={18} />
          Очистить список
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow flex flex-col"
          >
            {/* Фото */}
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4"
              />
              {product.oldPrice && (
                <span className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 text-xs rounded font-medium">
                  -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Информация */}
            <div className="p-5 flex flex-col grow">
              <Link
                href={`/product/${product.id}`}
                className="font-medium hover:text-blue-600 line-clamp-2 mb-2 block"
              >
                {product.name}
              </Link>

              <p className="text-sm text-gray-500 mb-1">{product.brand}</p>

              <div className="mt-auto">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xl font-bold">
                      {product.price.toLocaleString()} ₽
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        {product.oldPrice.toLocaleString()} ₽
                      </span>
                    )}
                  </div>

                  {!product.inStock && (
                    <span className="text-red-600 text-xs">Нет в наличии</span>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => moveToCartFromWishlist(product.id)}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart size={18} />
                    В корзину
                  </button>

                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="p-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="Удалить"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}