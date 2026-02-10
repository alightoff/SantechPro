'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { useShopStore } from '@/lib/store';
import { Product } from '@/lib/types';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart, addToWishlist, wishlist, cart, updateQuantity, removeFromCart } = useShopStore();

  const isInWishlist = wishlist.some((p) => p.id === product.id);
  const isInCart = cart.some((i) => i.id === product.id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <Link href={`/product/${product.id}`} className="block relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.oldPrice && (
          <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs rounded">
            -{Math.round((1 - product.price / product.oldPrice) * 100)}%
          </span>
        )}
      </Link>

      <div className="p-4 flex flex-col grow">
        <Link href={`/product/${product.id}`} className="font-medium hover:text-blue-600 line-clamp-2 min-h-10">
          {product.name}
        </Link>
        <p className="text-sm text-gray-500 mt-1">{product.brand}</p>

        <div className="mt-auto pt-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold">{product.price.toLocaleString()} ₽</span>
              {product.oldPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  {product.oldPrice.toLocaleString()} ₽
                </span>
              )}
            </div>

            {!product.inStock ? (
              <span className="text-red-600 text-sm">Нет в наличии</span>
            ) : (
              <div className="flex items-center gap-3">
                {isInCart ? (
                  <div className="flex items-center bg-gray-100 rounded-full">
                    <button
                      onClick={() => {
                        const item = cart.find(i => i.id === product.id);
                        if (item && item.quantity > 1) {
                          updateQuantity(product.id, item.quantity - 1);
                        } else if (item) {
                          removeFromCart(product.id);
                        }
                      }}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black"
                    >
                      −
                    </button>
                    
                    <span className="w-10 text-center font-medium">
                      {cart.find(i => i.id === product.id)?.quantity || 1}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(product.id, (cart.find(i => i.id === product.id)?.quantity || 1) + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="p-2 rounded-full hover:bg-gray-100"
                    title="В корзину"
                  >
                    <ShoppingCart size={20} />
                  </button>
                )}

                <button
                  onClick={() => addToWishlist(product)}
                  className={`p-2 rounded-full ${isInWishlist ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'}`}
                  title={isInWishlist ? 'Убрать из отложенного' : 'Отложить'}
                >
                  <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}