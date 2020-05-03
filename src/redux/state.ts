export enum PriceType {
  PER_KILO,
  PER_UNIT
}

export interface Product {
  name: string;
  imgPath?: string;
  priceType: PriceType;

  price?: number;
  priceKg?: number;

  cartAmount?: number;
  isFavorite?: boolean;
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
      priceType: PriceType.PER_KILO,
      priceKg: 1.15,
      cartAmount: 2,
      imgPath: 'fruits/apple.jpg',
      isFavorite: true
    },
    'pear': {
      name: 'Pear',
      priceType: PriceType.PER_KILO,
      priceKg: 1.22,
      cartAmount: 1,
      imgPath: 'fruits/pear.jpg'
    },
    'cherry': {
      name: 'Cherry',
      priceType: PriceType.PER_KILO,
      priceKg: 2.99,
      imgPath: 'fruits/cherry.jpg'
    }
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
};
