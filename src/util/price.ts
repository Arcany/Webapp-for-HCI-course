import { ProductMap, Product, ProductType } from '../redux/state';

export function cartItemPrice(product: Product): string {
  switch (product.type) {
    case ProductType.UNIT:
      return (product.unitPrice * (product.cartAmount ?? 0)).toFixed(2);
    case ProductType.MASS:
      return (product.massPrice * (product.cartAmount ?? 0) * product.massIncrement).toFixed(2);
  }
  console.warn('Reached end of cartItemPrice.');
  return '0.00';
}

export function productPrice(product: Product): number {
  switch (product.type) {
    case ProductType.UNIT:
      return (product.unitPrice * (product.cartAmount ?? 0));
    case ProductType.MASS:
      return (product.massPrice * (product.cartAmount ?? 0) * product.massIncrement);
  }
  console.warn('Reached end of productPrice.');
  return 0;
}

export function getTotalPriceOfOrder(products: ProductMap): string {
  let totalPrice = 0;
  Object.entries(products).forEach(([id, product]) => {
    totalPrice += parseFloat(cartItemPrice(product));
  });
  return totalPrice.toFixed(2);
}