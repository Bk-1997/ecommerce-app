import { Product } from '../types';

const BASE_URL = 'https://fakestoreapi.com';

export class ApiService {
  static async fetchProducts(categories?: string[], sortBy?: string): Promise<Product[]> {
    try {
      let url = `${BASE_URL}/products`;
      
      if (categories && categories.length > 0) {
        const productPromises = categories.map(category =>
          fetch(`${BASE_URL}/products/category/${category}`).then(res => res.json())
        );
        const results = await Promise.all(productPromises);
        const allProducts = results.flat();
        
        const uniqueProducts = allProducts.filter((product, index, self) =>
          index === self.findIndex(p => p.id === product.id)
        );
        
        return this.sortProducts(uniqueProducts, sortBy);
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const products = await response.json();
      return this.sortProducts(products, sortBy);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  static async fetchProductById(id: number): Promise<Product> {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  static async fetchCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${BASE_URL}/products/categories`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  private static sortProducts(products: Product[], sortBy?: string): Product[] {
    if (!sortBy || sortBy === 'default') return products;

    return [...products].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }
}