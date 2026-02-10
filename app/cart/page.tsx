// app/cart/page.tsx
'use client';

import { useShopStore } from '@/lib/store';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useShopStore();

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь в реальном проекте будет отправка на сервер / API
    console.log('Заказ:', { cart, deliveryType, name, phone, address, comment });
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="py-12 text-center">
        <div className="max-w-md mx-auto bg-green-50 border border-green-200 rounded-xl p-8">
          <ShoppingBag className="mx-auto text-green-600" size={64} />
          <h2 className="text-2xl font-bold mt-4 mb-2">Заказ оформлен!</h2>
          <p className="text-gray-600 mb-6">
            Спасибо за заказ. Мы свяжемся с вами в ближайшее время.
          </p>
          <Link
            href="/catalog"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Продолжить покупки
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="py-12 text-center">
        <ShoppingBag className="mx-auto text-gray-400" size={80} />
        <h2 className="text-2xl font-bold mt-6 mb-3">Корзина пуста</h2>
        <p className="text-gray-600 mb-8">Добавьте товары из каталога</p>
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
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Список товаров */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            {cart.map(item => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                {/* Фото */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain rounded-lg border"
                  />
                </div>

                {/* Информация */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${item.id}`}
                    className="font-medium hover:text-blue-600 line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">{item.brand}</p>
                  <div className="mt-2 font-bold text-lg">
                    {item.price.toLocaleString()} ₽
                  </div>
                </div>

                {/* Количество и удаление */}
                <div className="flex items-center gap-6 sm:gap-10">
                  <div className="flex items-center border rounded-full">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-full"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-full"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800 p-2"
                    title="Удалить"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Блок оформления */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
            <h2 className="text-xl font-bold mb-6">Оформление заказа</h2>

            <div className="mb-6">
              <h3 className="font-medium mb-3">Способ получения</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setDeliveryType('delivery')}
                  className={`py-3 px-4 rounded-lg border text-center font-medium transition-colors ${
                    deliveryType === 'delivery'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  Доставка
                </button>
                <button
                  onClick={() => setDeliveryType('pickup')}
                  className={`py-3 px-4 rounded-lg border text-center font-medium transition-colors ${
                    deliveryType === 'pickup'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  Самовывоз
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Имя *</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Телефон *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {deliveryType === 'delivery' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Адрес доставки *</label>
                  <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">Комментарий к заказу</label>
                <textarea
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  rows={3}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between text-lg mb-2">
                  <span>Итого:</span>
                  <span className="font-bold">{total.toLocaleString()} ₽</span>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  Оформить заказ
                  <ArrowRight size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}