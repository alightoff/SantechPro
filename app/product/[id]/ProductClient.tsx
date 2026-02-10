// app/product/[id]/ProductClient.tsx
'use client';

import Image from 'next/image';
import { Heart, ShoppingCart, Minus, Plus } from 'lucide-react';
import { useShopStore } from '@/lib/store';
import { Product } from '@/lib/types';
import clsx from 'clsx';

interface Props {
  product: Product;
}

export default function ProductClient({ product }: Props) {
  const { addToCart, removeFromCart, updateQuantity, cart, wishlist } = useShopStore();

  const isInWishlist = wishlist.some((p) => p.id === product.id);
  const cartItem = cart.find((i) => i.id === product.id);
  const isInCart = !!cartItem;

  return (
    <div className="py-6 md:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Фото товара */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 flex items-center justify-center">
          <div className="relative w-full aspect-square max-w-105 mx-auto">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-4"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
            />
          </div>
        </div>

        {/* Информация и действия */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight">
              {product.name}
            </h1>
            <p className="mt-2 text-gray-600 text-sm md:text-base">
              {product.brand} • {product.category}
            </p>
          </div>

          <div className="flex items-end gap-3">
            {product.oldPrice && (
              <span className="text-lg md:text-xl text-gray-500 line-through">
                {product.oldPrice.toLocaleString()} ₽
              </span>
            )}
            <span className="text-3xl md:text-4xl font-bold text-blue-700">
              {product.price.toLocaleString()} ₽
            </span>
          </div>

          {/* Статус наличия + корзина */}
          {!product.inStock ? (
            <div className="bg-red-50 text-red-700 px-5 py-3.5 rounded-lg text-center font-medium">
              Товар временно отсутствует
            </div>
          ) : isInCart ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-gray-50 px-5 py-4 rounded-xl">
                <span className="font-medium text-gray-700">В корзине:</span>

                <div className="flex items-center bg-white border border-gray-200 rounded-full shadow-sm">
                  <button
                    onClick={() => {
                      if (cartItem.quantity <= 1) {
                        removeFromCart(product.id);
                      } else {
                        updateQuantity(product.id, cartItem.quantity - 1);
                      }
                    }}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 active:bg-gray-100 rounded-l-full transition-colors"
                    aria-label="Уменьшить количество"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="w-12 text-center font-semibold text-gray-800">
                    {cartItem.quantity}
                  </span>

                  <button
                    onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 active:bg-gray-100 rounded-r-full transition-colors"
                    aria-label="Увеличить количество"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <span className="text-green-600 font-medium text-sm">✓ Добавлен</span>
              </div>

              <button
                onClick={() => removeFromCart(product.id)}
                className="text-red-600 hover:text-red-700 text-sm font-medium underline-offset-2 hover:underline transition-colors"
              >
                Убрать из корзины
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className={clsx(
                'w-full md:w-auto min-w-55 py-3.5 px-8 rounded-xl',
                'bg-blue-600 hover:bg-blue-700 active:bg-blue-800',
                'text-white font-medium text-base md:text-lg',
                'flex items-center justify-center gap-2.5 transition-colors shadow-sm',
              )}
              disabled={!product.inStock}
            >
              <ShoppingCart size={20} strokeWidth={2.1} />
              Добавить в корзину
            </button>
          )}

          {/* Описание */}
          <div className="mt-2 prose prose-sm md:prose-base max-w-none text-gray-700">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">
              Описание
            </h3>
            <p className="leading-relaxed">{product.description}</p>

            <ul className="list-disc pl-5 mt-4 space-y-1.5 text-gray-700">
              <li>Материал: {product.category === 'Смесители' ? 'Латунь с хромовым покрытием' : 'Санфарфор / Акрил'}</li>
              <li>Гарантия от производителя: 5 лет</li>
              <li>Страна: Германия / Россия / Чехия</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}