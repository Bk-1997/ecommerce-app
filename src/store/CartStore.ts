import { makeAutoObservable } from 'mobx';
import { Product, CartItem } from '../types';

export class CartStore {
  items: CartItem[] = [];

  constructor() {
    makeAutoObservable(this);
    this.loadFromStorage();
  }

  addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = this.items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    
    this.saveToStorage();
  };

  removeFromCart = (productId: number) => {
    this.items = this.items.filter(item => item.product.id !== productId);
    this.saveToStorage();
  };

  updateQuantity = (productId: number, quantity: number) => {
    const item = this.items.find(item => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.saveToStorage();
      }
    }
  };

  clearCart = () => {
    this.items = [];
    this.saveToStorage();
  };

  get totalItems(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalValue(): number {
    return this.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  get isEmpty(): boolean {
    return this.items.length === 0 || this.totalItems === 0;
  }

  private saveToStorage = () => {
    try {
      localStorage.setItem('cart', JSON.stringify(this.items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  };

  private loadFromStorage = () => {
    try {
      const saved = localStorage.getItem('cart');
      if (saved) {
        this.items = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  };
}