export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface FilterState {
  categories: string[];
  sortBy: 'default' | 'price-asc' | 'price-desc' | 'title-asc' | 'title-desc';
}