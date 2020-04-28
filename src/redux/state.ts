export interface ShoppingCartItem {
  quantity: number;
}

export interface Product {
  name: string;
  price: number;
}

export interface ApplicationState {
  cart: {[productId: string]: ShoppingCartItem};
  products: {[productId: string]: Product};
}

export const defaultState: ApplicationState = {
  cart: {
    'apple': {quantity: 2},
    'pear': {quantity: 1}
  },
  products: {
    'apple': {
      name: 'Apple',
      price: 1.15
    },
    'pear': { name: 'Pear', price: 1.22 },
    'cherry': { name: 'Cherry', price: 2.99 }
  }
}
