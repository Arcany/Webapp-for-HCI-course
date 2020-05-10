import { Product, ProductMap, PriceType } from '../redux/state';

export function cartItemPrice(product: Product): string {
  if (product.cartAmount) {
    if (product.priceKg) return (product.priceKg * product.cartAmount).toFixed(2);
    if (product.price) return (product.price * product.cartAmount).toFixed(2);
    if (product.priceL) return (product.priceL * product.cartAmount).toFixed(2);
  } return (0).toFixed(2);
}

export function productPrice(product: Product): number {
  if (product.cartAmount) {
    switch (product.priceType) {
      case PriceType.PER_KILO:
        return (product.priceKg ?? 0) * product.cartAmount;
      case PriceType.PER_LITRE:
        return (product.priceL ?? 0) * product.cartAmount;
      case PriceType.PER_UNIT:
        return (product.price ?? 0) * product.cartAmount;
    }
  }
  return 0;
}

export function getTotalPriceOfOrder(products: ProductMap): string {
  let totalPrice = 0;
  Object.entries(products).forEach(([id, product]) => {
    totalPrice += parseFloat(cartItemPrice(product));
  });
  return totalPrice.toFixed(2);
}