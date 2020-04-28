export interface ShoppingCartInfo {
  quantity: number;
}

export interface Product {
  name: string;
  price: number;
  cart?: ShoppingCartInfo;
}

export interface ApplicationState {
  products: {[productId: string]: Product};
}

export const defaultState: ApplicationState = {
  products: {
    'apple': {
      name: 'Apple',
      price: 1.15,
      cart: { quantity: 2 }
    },
    'pear': { name: 'Pear', price: 1.22, cart: { quantity: 1 } },
    'cherry': { name: 'Cherry', price: 2.99 }
  }
}
