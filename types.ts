
export type Language = 'en' | 'am';

export interface Product {
  id: string;
  name: string;
  nameAm: string;
  description: string;
  descriptionAm: string;
  price: number;
  image: string;
  category: 'Men' | 'Women' | 'Kids' | 'Accessories';
  sizes: string[];
  colors: string[];
  isFeatured?: boolean;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  password?: string;
  createdAt: number;
}

export interface Order {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  customerName: string;
  phone: string;
  address: string;
  size: string;
  color: string;
  status: 'Pending' | 'Approved' | 'Declined';
  createdAt: number;
}

export interface Translation {
  navHome: string;
  navShop: string;
  navAdmin: string;
  navOrders: string;
  navLogin: string;
  navLogout: string;
  navProfile: string;
  heroTitle: string;
  heroSub: string;
  featuredTitle: string;
  buyNow: string;
  viewDetails: string;
  orderTitle: string;
  fullName: string;
  phoneNumber: string;
  deliveryAddress: string;
  submitOrder: string;
  successOrder: string;
  footerContact: string;
  size: string;
  color: string;
  category: string;
  searchPlaceholder: string;
  all: string;
  price: string;
  statusPending: string;
  statusApproved: string;
  statusDeclined: string;
  loginTitle: string;
  signupTitle: string;
  email: string;
  password: string;
  dontHaveAccount: string;
  alreadyHaveAccount: string;
  fullNameError: string;
  passwordError: string;
  authError: string;
  duplicateError: string;
  loginRequired: string;
  show: string;
  hide: string;
  productDetails: string;
}
