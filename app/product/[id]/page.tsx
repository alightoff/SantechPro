// app/product/[id]/page.tsx
// Это серверный компонент — НЕ ДОБАВЛЯЙ 'use client' сюда!

import { notFound } from 'next/navigation';
import { products } from '@/lib/mockData';
import ProductClient from './ProductClient'; // ← новый файл

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = parseInt(id, 10);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  return <ProductClient product={product} />;
}