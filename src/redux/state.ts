export enum ProductType {
  UNIT = 'UNIT', MASS = 'MASS'
}

export interface BaseProduct {
  name: string;
  imgPath?: string;
  categories: {primary: string; sub?: string}[];
  origin?: string;

  cartAmount?: number;
  isFavorite?: boolean;
}

export interface ProductUnit extends BaseProduct {
  type: ProductType.UNIT;
  unitPrice: number;
  massLabel?: string;
  unitMass: number;
}

export interface ProductMass extends BaseProduct {
  type: ProductType.MASS;
  massLabel?: string;
  massIncrement: number;
  massPrice: number;
}

export type Product = ProductUnit|ProductMass;

export interface Category {
  subCategories: string[] | null;
}

export type CategoryMap = {[categoryName: string]: Category};
export type ProductMap = {[productId: string]: Product};
export type PaymentInformationObject = { [key: string]: string | boolean | undefined | string[] | boolean }
export type ShippingInformationObject = { [key: string]: string | boolean | undefined | string[] | boolean }

export interface ToastData {
  id: string;
  title: string;
  body: JSX.Element;
  delay?: number;
}

export type ToastMap = {[toastId: string]: ToastData}

export interface ApplicationState {
  products: ProductMap;
  categories: CategoryMap;
  originFilters: string[];
  favoriteFilter: boolean;
  searchFilter: string;
  paymentInformation: PaymentInformationObject;
  shippingInformation: ShippingInformationObject;
  toasts: ToastMap;
}

const Cat = {
  FruitsAndVegetables: 'Fruits and Vegatables',
  Milk: 'Milk',
  Bread: 'Bread',
  Meat: 'Meat',
  Grains: 'Grains',

  Sub: {
    ProcessedMeat: 'Processed',
    RawMeat: 'Raw',
    WBread: 'White bread',
    RBread: 'Normal Bread',
    DrinkingMilk: 'Drinking milk',
    Yogurt: 'Yogurt',
    Cheese: 'Cheese',
    Fruits: 'Fruits',
    Vegetables: 'Vegetables',
  }
};

const Mass = {
  KG: 'kg',
  L: 'l'
};

export const defaultState: ApplicationState = {
  products: {
    'apple': {
      name: 'Apple',
      origin: 'Estonia',
      type: ProductType.UNIT,
      unitPrice: 0.45,
      unitMass: 0.25,
      imgPath: 'fruits/apple.jpg',
      isFavorite: true,
      categories: [
        { primary: Cat.FruitsAndVegetables, sub: Cat.Sub.Fruits }
      ]
    },
    'pear': {
      name: 'Pear',
      origin: 'Latvia',
      type: ProductType.UNIT,
      unitPrice: 0.32,
      unitMass: 0.2,
      imgPath: 'fruits/pear.jpg',
      categories: [
        { primary: Cat.FruitsAndVegetables, sub: Cat.Sub.Fruits }
      ]
    },
    'cherry': {
      name: 'Cherry',
      origin: 'Lithuania',
      type: ProductType.MASS,
      massIncrement: 0.1,
      massLabel: Mass.KG,
      massPrice: 3.99,
      imgPath: 'fruits/cherry.jpg',
      categories: [
        { primary: Cat.FruitsAndVegetables, sub: Cat.Sub.Fruits }
      ]
    },
    'milk': {
      name: 'Milk',
      origin: 'Estonia',
      type: ProductType.UNIT,
      unitPrice: 0.99,
      massLabel: Mass.L,
      unitMass: 1,
      imgPath: 'dairy/milk.jpg',
      categories: [
        { primary: Cat.Milk, sub: Cat.Sub.DrinkingMilk }
      ]
    },
    'yogurt': {
      name: 'Yogurt',
      origin: 'Estonia',
      type: ProductType.UNIT,
      unitPrice: 0.95,
      massLabel: Mass.L,
      unitMass: 0.5,
      imgPath: 'dairy/yogurt.jpg',
      categories: [
        { primary: Cat.Milk, sub: Cat.Sub.Yogurt }
      ]
    },
    'cheese': {
      name: 'Cheese',
      origin: 'Poland',
      type: ProductType.UNIT,
      unitPrice: 1.15,
      unitMass: 0.4,
      imgPath: 'dairy/cheese.jpg',
      categories: [
        { primary: Cat.Milk, sub: Cat.Sub.Cheese }
      ]
    },
    'carrot': {
      name: 'Carrot',
      origin: 'Spain',
      type: ProductType.UNIT,
      unitMass: 0.3,
      unitPrice: 0.23,
      imgPath: 'vegetables/carrot.jpg',
      categories: [
        { primary: Cat.FruitsAndVegetables, sub: Cat.Sub.Vegetables }
      ]
    },
    'wbread': {
      name: 'White Bread',
      origin: 'Estonia',
      type: ProductType.UNIT,
      unitMass: 0.5,
      unitPrice: 0.74,
      imgPath: 'bread/wbread.jpg',
      categories: [
        { primary: Cat.Bread, sub: Cat.Sub.WBread }
      ]
    },
    'rbread': {
      name: 'Regular Bread',
      origin: 'Estonia',
      type: ProductType.UNIT,
      unitMass: 0.4,
      unitPrice: 0.89,
      imgPath: 'bread/rbread.jpg',
      categories: [
        { primary: Cat.Bread, sub: Cat.Sub.RBread }
      ]
    },
    'sausages': {
      name: 'Sausages',
      origin: 'Sweden',
      type: ProductType.UNIT,
      unitMass: 0.5,
      unitPrice: 3.39,
      imgPath: 'meats/sausages.jpg',
      categories: [
        { primary: Cat.Meat, sub: Cat.Sub.ProcessedMeat }
      ]
    },
    'rawbeef': {
      name: 'Raw Beef',
      origin: 'Russia',
      type: ProductType.UNIT,
      unitMass: 0.5,
      unitPrice: 4.49,
      imgPath: 'meats/rawbeef.jpg',
      categories: [
        { primary: Cat.Meat, sub: Cat.Sub.RawMeat }
      ]
    },
    'buckwheat': {
      name: 'Buckwheat',
      origin: 'Ukraine',
      type: ProductType.UNIT,
      unitMass: 1,
      unitPrice: 2.29,
      imgPath: 'grains/buckwheat.jpg',
      categories: [
        { primary: Cat.Grains }
      ]
    }
  },

  categories: {
    [Cat.FruitsAndVegetables]: {
      subCategories: [Cat.Sub.Fruits, Cat.Sub.Vegetables],
    },
    [Cat.Milk]: {
      subCategories: [Cat.Sub.DrinkingMilk, Cat.Sub.Yogurt, Cat.Sub.Cheese]
    },
    [Cat.Bread]: {
      subCategories: [Cat.Sub.WBread, Cat.Sub.RBread]
    },
    [Cat.Meat]: {
      subCategories: [Cat.Sub.ProcessedMeat, Cat.Sub.RawMeat]
    },
    [Cat.Grains]: {
      subCategories: null
    }
  },

  originFilters: [],
  favoriteFilter: false,
  searchFilter: '',

  paymentInformation: {
    'Payment Type': 'Credit card',
    'Card Type': 'Visa',
    'Expiration Date': '',
    'Card Number': '',
    'CVV': '',
    'Delivery Checkbox': true
  },

  shippingInformation: {
    'Delivery method': 'Scheduled delivery',
    'First Name': '',
    'Last Name': '',
    'Address': '',
    'Specifics about address': '',
    'City': '',
    'County': 'Tartu County',
    'Zip code': '',
    'Phone Number': '',
    'Notes to Driver': ''
  },

  toasts: {}
};
