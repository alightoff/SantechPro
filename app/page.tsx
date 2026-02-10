import ProductCard from '@/components/ProductCard';
import { categories, products } from '@/lib/mockData';
import Link from 'next/link';

export default function Home() {
  const hits = products.slice(0, 4); // или фильтр по акциям

  return (
    <div className="py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Сантехника PRO — Ростов-на-Дону</h1>
        <p className="text-xl text-gray-700 mb-6">
          Надёжная сантехника от ведущих брендов с доставкой по всей России
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/catalog?category=${encodeURIComponent(cat)}`}
              className="bg-blue-100 hover:bg-blue-200 px-6 py-3 rounded-full font-medium transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Хиты продаж</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hits.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}