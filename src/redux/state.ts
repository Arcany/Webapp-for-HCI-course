export interface ShoppingCartInfo {
  quantity: number;
}

export interface Product {
  name: string;
  price: number;
  cart?: ShoppingCartInfo;
}

export interface Category {
  subCategories: string[] | null;
}

export type CategoryMap = {[categoryName: string]: Category};
export type ProductMap = {[productId: string]: Product};

export interface ApplicationState {
  products: ProductMap;
  categories: CategoryMap;
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
  },
  categories: {
    'Fruits and vegetables': {
      subCategories: ['Fruits', 'Vegetables']
    },
    'Milk': {
      subCategories: ['Drinking milk', 'Yogurt', 'Cheese']
    },
    'Bread': {
      subCategories: ['White bread', 'Normal Bread']
    },
    'Meat': {
      subCategories: ['Processed', 'Raw']
    },
    'Grains': {
      subCategories: null
    }
  }
}
