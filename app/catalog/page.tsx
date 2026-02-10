// app/catalog/page.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/lib/mockData';
import { X, Filter } from 'lucide-react';

export default function Catalog() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Получаем значения из URL
  const getInitialState = () => ({
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    minPrice: searchParams.get('minPrice') || '0',
    maxPrice: searchParams.get('maxPrice') || '100000',
    inStock: searchParams.get('inStock') === 'true',
    onSale: searchParams.get('onSale') === 'true',
  });

  const [filters, setFilters] = useState(getInitialState);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const brands = Array.from(new Set(products.map(p => p.brand)));

  // Фильтрация товаров (чисто вычислительная)
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (filters.category && product.category !== filters.category) return false;
      if (filters.brand && product.brand !== filters.brand) return false;
      if (Number(filters.minPrice) > product.price) return false;
      if (Number(filters.maxPrice) < product.price) return false;
      if (filters.inStock && !product.inStock) return false;
      if (filters.onSale && !product.oldPrice) return false;
      return true;
    });
  }, [filters]);

  // Синхронизация фильтров → URL (после рендера, без зацикливания)
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.category) params.set('category', filters.category);
    if (filters.brand) params.set('brand', filters.brand);
    if (filters.minPrice !== '0') params.set('minPrice', filters.minPrice);
    if (filters.maxPrice !== '100000') params.set('maxPrice', filters.maxPrice);
    if (filters.inStock) params.set('inStock', 'true');
    if (filters.onSale) params.set('onSale', 'true');

    const query = params.toString();
    const newUrl = query ? `/catalog?${query}` : '/catalog';

    // Обновляем только если URL реально изменился
    const current = window.location.pathname + window.location.search;
    if (newUrl !== current) {
      router.replace(newUrl, { scroll: false });
    }
  }, [filters, router]);

  // Обработчики изменений (все через один объект состояния)
  const updateFilter = (key: keyof typeof filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      brand: '',
      minPrice: '0',
      maxPrice: '100000',
      inStock: false,
      onSale: false,
    });
    router.replace('/catalog', { scroll: false });
  };

  const hasActiveFilters = Object.values(filters).some(v =>
    v !== '' && v !== '0' && v !== '100000' && v !== false
  );

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Каталог сантехники</h1>

        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="lg:hidden flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Filter size={20} />
          Фильтры
        </button>
      </div>

      <div className="flex gap-8">
        {/* Панель фильтров */}
        <aside
          className={`${
            showMobileFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden'
          } lg:block lg:relative lg:w-80 shrink-0`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Фильтры</h2>
            {hasActiveFilters && (
              <button onClick={resetFilters} className="text-blue-600 hover:underline text-sm">
                Сбросить всё
              </button>
            )}
          </div>

          {/* Категория */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Категория</h3>
            <select
              value={filters.category}
              onChange={e => updateFilter('category', e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Все категории</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Бренд */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Бренд</h3>
            <select
              value={filters.brand}
              onChange={e => updateFilter('brand', e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Все бренды</option>
              {brands.map(b => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Цена */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Цена, ₽</h3>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={filters.minPrice}
                onChange={e => updateFilter('minPrice', e.target.value)}
                placeholder="от"
                className="w-full p-3 border rounded-lg"
              />
              <span>—</span>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={e => updateFilter('maxPrice', e.target.value)}
                placeholder="до"
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>

          {/* Чекбоксы */}
          <div className="space-y-3 mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={e => updateFilter('inStock', e.target.checked)}
                className="w-5 h-5"
              />
              <span>Только в наличии</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.onSale}
                onChange={e => updateFilter('onSale', e.target.checked)}
                className="w-5 h-5"
              />
              <span>Со скидкой</span>
            </label>
          </div>

          {showMobileFilters && (
            <button
              onClick={() => setShowMobileFilters(false)}
              className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg"
            >
              Показать товары ({filteredProducts.length})
            </button>
          )}
        </aside>

        {/* Основной контент */}
        <div className="flex-1">
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-3 mb-6">
              {filters.category && (
                <Chip label={filters.category} onRemove={() => updateFilter('category', '')} />
              )}
              {filters.brand && <Chip label={filters.brand} onRemove={() => updateFilter('brand', '')} />}
              {filters.inStock && (
                <Chip label="В наличии" onRemove={() => updateFilter('inStock', false)} />
              )}
              {filters.onSale && (
                <Chip label="Со скидкой" onRemove={() => updateFilter('onSale', false)} />
              )}
              {(filters.minPrice !== '0' || filters.maxPrice !== '100000') && (
                <Chip
                  label={`Цена ${filters.minPrice}—${filters.maxPrice} ₽`}
                  onRemove={() => {
                    updateFilter('minPrice', '0');
                    updateFilter('maxPrice', '100000');
                  }}
                />
              )}
            </div>
          )}

          <p className="text-gray-600 mb-6">
            Найдено товаров: <strong>{filteredProducts.length}</strong>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">По вашим фильтрам ничего не найдено 😔</p>
              <button onClick={resetFilters} className="mt-4 text-blue-600 hover:underline">
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Компонент Chip
function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
      {label}
      <button onClick={onRemove}>
        <X size={16} />
      </button>
    </span>
  );
}