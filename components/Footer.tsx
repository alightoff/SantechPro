export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">Сантехника PRO</h3>
          <p>Магазин сантехники в Ростове-на-Дону</p>
          <p>Доставка по всей России</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Контакты</h3>
          <p>г. Ростов-на-Дону, ул. Текучева, 206</p>
          <p>Тел: +7 (863) 000-00-00</p>
          <p>Email: info@santehnika-pro.ru</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Время работы</h3>
          <p>Пн–Сб: 9:00 – 19:00</p>
          <p>Вс: 10:00 – 18:00</p>
        </div>
      </div>
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        © 2026 Сантехника PRO. Все права защищены.
      </div>
    </footer>
  );
}