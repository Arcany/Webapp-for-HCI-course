export enum PriceType {
  PER_KILO,
  PER_UNIT,
  PER_LITRE
}

export interface Product {
  name: string;
  imgPath?: string;
  priceType: PriceType;

  price?: number;
  priceKg?: number;
  priceL?: number;

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
    },
    'milk': {
      name: 'Milk',
      priceType: PriceType.PER_LITRE,
      priceL: 0.50,
      imgPath: 'dairy/milk.jpg'
    },
    'yogurt': {
      name: 'Yogurt',
      priceType: PriceType.PER_KILO,
      priceKg: 0.50,
      imgPath: 'dairy/yogurt.jpg'
    },
    'cheese': {
      name: 'Cheese',
      priceType: PriceType.PER_KILO,
      priceKg: 5.00,
      imgPath: 'dairy/cheese.jpg'
    },
    'carrot': {
      name: 'Carrot',
      priceType: PriceType.PER_KILO,
      priceKg: 0.69,
      imgPath: 'vegetables/carrot.jpg'
    },
    'wbread': {
      name: 'White Bread',
      priceType: PriceType.PER_KILO,
      priceKg: 0.80,
      imgPath: 'bread/wbread.jpg'
    },
    'rbread': {
      name: 'Regular Bread',
      priceType: PriceType.PER_KILO,
      priceKg: 0.80,
      imgPath: 'bread/rbread.jpg'
    },
    'sausages': {
      name: 'Sausages',
      priceType: PriceType.PER_KILO,
      priceKg: 4.20,
      imgPath: 'meats/sausages.jpg'
    },
    'rawbeef': {
      name: 'Raw Beef',
      priceType: PriceType.PER_KILO,
      priceKg: 12.99,
      imgPath: 'meats/rawbeef.jpg'
    },
    'buckwheat': {
      name: 'Buckwheat',
      priceType: PriceType.PER_KILO,
      priceKg: 2.10,
      imgPath: 'grains/buckwheat.jpg'
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
