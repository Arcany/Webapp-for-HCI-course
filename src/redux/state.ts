export enum PriceType {
  PER_KILO,
  PER_UNIT,
  PER_LITRE
}

export interface Product {
  name: string;
  imgPath?: string;
  priceType: PriceType;
  categories: {primary: string; sub?: string}[];

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

export const defaultState: ApplicationState = {
  products: {
    'apple': {
      name: 'Apple',
      priceType: PriceType.PER_KILO,
      priceKg: 1.15,
      cartAmount: 2,
      imgPath: 'fruits/apple.jpg',
      isFavorite: true,
      categories: [
        { primary: Cat.FruitsAndVegetables, sub: Cat.Sub.Fruits }
      ]
    },
    'pear': {
      name: 'Pear',
      priceType: PriceType.PER_KILO,
      priceKg: 1.22,
      cartAmount: 1,
      imgPath: 'fruits/pear.jpg',
      categories: [
        { primary: Cat.FruitsAndVegetables, sub: Cat.Sub.Fruits }
      ]
    },
    'cherry': {
      name: 'Cherry',
      priceType: PriceType.PER_KILO,
      priceKg: 2.99,
      imgPath: 'fruits/cherry.jpg',
      categories: [
        { primary: Cat.FruitsAndVegetables, sub: Cat.Sub.Fruits }
      ]
    },
    'milk': {
      name: 'Milk',
      priceType: PriceType.PER_LITRE,
      priceL: 0.50,
      imgPath: 'dairy/milk.jpg',
      categories: [
        { primary: Cat.Milk, sub: Cat.Sub.DrinkingMilk }
      ]
    },
    'yogurt': {
      name: 'Yogurt',
      priceType: PriceType.PER_KILO,
      priceKg: 0.50,
      imgPath: 'dairy/yogurt.jpg',
      categories: [
        { primary: Cat.Milk, sub: Cat.Sub.Yogurt }
      ]
    },
    'cheese': {
      name: 'Cheese',
      priceType: PriceType.PER_KILO,
      priceKg: 5.00,
      imgPath: 'dairy/cheese.jpg',
      categories: [
        { primary: Cat.Milk, sub: Cat.Sub.Cheese }
      ]
    },
    'carrot': {
      name: 'Carrot',
      priceType: PriceType.PER_KILO,
      priceKg: 0.69,
      imgPath: 'vegetables/carrot.jpg',
      categories: [
        { primary: Cat.FruitsAndVegetables, sub: Cat.Sub.Vegetables }
      ]
    },
    'wbread': {
      name: 'White Bread',
      priceType: PriceType.PER_KILO,
      priceKg: 0.80,
      imgPath: 'bread/wbread.jpg',
      categories: [
        { primary: Cat.Bread, sub: Cat.Sub.WBread }
      ]
    },
    'rbread': {
      name: 'Regular Bread',
      priceType: PriceType.PER_KILO,
      priceKg: 0.80,
      imgPath: 'bread/rbread.jpg',
      categories: [
        { primary: Cat.Bread, sub: Cat.Sub.RBread }
      ]
    },
    'sausages': {
      name: 'Sausages',
      priceType: PriceType.PER_KILO,
      priceKg: 4.20,
      imgPath: 'meats/sausages.jpg',
      categories: [
        { primary: Cat.Meat, sub: Cat.Sub.ProcessedMeat }
      ]
    },
    'rawbeef': {
      name: 'Raw Beef',
      priceType: PriceType.PER_KILO,
      priceKg: 12.99,
      imgPath: 'meats/rawbeef.jpg',
      categories: [
        { primary: Cat.Meat, sub: Cat.Sub.RawMeat }
      ]
    },
    'buckwheat': {
      name: 'Buckwheat',
      priceType: PriceType.PER_KILO,
      priceKg: 2.10,
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
  }
};
