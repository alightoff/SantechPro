// app/contacts/page.tsx
'use client';

import { useState } from 'react';
import { Send, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Имитация отправки (в реальном проекте здесь будет fetch на API / email-сервис)
    await new Promise(resolve => setTimeout(resolve, 1200));

    console.log('Форма обратной связи:', formData);
    setSubmitted(true);
    setLoading(false);

    // Можно очистить форму
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-2">Контакты</h1>
      <p className="text-gray-600 mb-10 max-w-3xl">
        Мы всегда рады помочь с выбором сантехники. Звоните, пишите или приезжайте в наш магазин в Ростове-на-Дону.
      </p>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Левая колонка — информация + карта */}
        <div className="space-y-10">
          <div className="bg-white rounded-xl shadow-sm border p-7">
            <h2 className="text-2xl font-bold mb-6">Наш магазин</h2>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <MapPin className="text-blue-600 mt-1" size={24} />
                <div>
                  <h3 className="font-medium">Адрес</h3>
                  <p className="text-gray-700">
                    г. Ростов-на-Дону, ул. Текучева, 206 (ТЦ «Горизонт» или любой реальный адрес)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-blue-600 mt-1" size={24} />
                <div>
                  <h3 className="font-medium">Телефон</h3>
                  <p className="text-gray-700">
                    <a href="tel:+78632500000" className="hover:text-blue-600">
                      +7 (863) 250-00-00
                    </a>
                  </p>
                  <p className="text-gray-500 text-sm mt-1">Пн–Сб: 9:00–19:00, Вс: 10:00–18:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-blue-600 mt-1" size={24} />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p>
                    <a href="mailto:info@santehnika-pro.ru" className="hover:text-blue-600">
                      info@santehnika-pro.ru
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-blue-600 mt-1" size={24} />
                <div>
                  <h3 className="font-medium">Режим работы</h3>
                  <p className="text-gray-700">
                    Пн–Сб: 9:00 – 19:00<br />
                    Вс: 10:00 – 18:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Карта (iframe Яндекс.Карты или Google Maps) */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden h-96">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Ayour_map_id&lang=ru_RU&scroll=true"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Карта магазина"
              // Замени на реальный embed-код Яндекс.Карт или Google Maps
              // Пример реального: https://yandex.ru/map-widget/v1/?ll=39.720359%2C47.222078&z=16&text=Ростов-на-Дону%2C%20ул.%20Текучева%2C%20206
            />
          </div>
        </div>

        {/* Правая колонка — форма обратной связи */}
        <div className="bg-white rounded-xl shadow-sm border p-7 lg:p-9">
          <h2 className="text-2xl font-bold mb-6">Напишите нам</h2>
          <p className="text-gray-600 mb-8">
            Оставьте заявку — менеджер свяжется с вами в течение 15–30 минут в рабочее время.
          </p>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <Send className="mx-auto text-green-600 mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">Сообщение отправлено!</h3>
              <p className="text-gray-700">
                Спасибо за обращение. Мы ответим вам в ближайшее время.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-blue-600 hover:underline"
              >
                Отправить ещё одно сообщение
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Ваше имя *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Телефон *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+7 (___) ___-__-__"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Сообщение *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-lg font-medium text-white transition-colors flex items-center justify-center gap-2 ${
                  loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {loading ? (
                  'Отправка...'
                ) : (
                  <>
                    Отправить <Send size={18} />
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}