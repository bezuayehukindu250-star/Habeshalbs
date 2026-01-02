
import { Product, Order, User } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

const PRODUCTS_KEY = 'habesha_lbs_products';
const ORDERS_KEY = 'habesha_lbs_orders';
const USERS_KEY = 'habesha_lbs_users';
const CURRENT_USER_KEY = 'habesha_lbs_current_user';

export const storageService = {
  getProducts: (): Product[] => {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (!stored) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(stored);
  },

  saveProducts: (products: Product[]) => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  },

  getOrders: (): Order[] => {
    const stored = localStorage.getItem(ORDERS_KEY);
    const orders: Order[] = stored ? JSON.parse(stored) : [];
    return orders;
  },

  getOrdersByUser: (userId: string): Order[] => {
    const all = storageService.getOrders();
    return all.filter(o => o.userId === userId);
  },

  addOrder: (order: Order) => {
    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    orders.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  },

  updateOrderStatus: (orderId: string, status: Order['status']) => {
    const stored = localStorage.getItem(ORDERS_KEY);
    const orders: Order[] = stored ? JSON.parse(stored) : [];
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      orders[index].status = status;
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    }
  },

  // User Management
  getUsers: (): User[] => {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  saveUser: (user: User) => {
    const users = storageService.getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  setCurrentUser: (user: User) => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  },

  logoutUser: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};
