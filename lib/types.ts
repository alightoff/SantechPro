export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;        // для акций
  image: string;
  category: string;         // унитазы, смесители, ванны и т.д.
  description: string;
  brand: string;            // Grohe, Hansgrohe, Santek, Rossinka и т.д.
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export type DeliveryType = 'delivery' | 'pickup';