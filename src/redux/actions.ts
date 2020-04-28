import * as ActionTypes from './actionTypes'

export interface SetCartProductQuantity {
  type: ActionTypes.SET_CART_PRODUCT_QUANTITY,
  productId: string;
  quantity: number;
}

export type setCartProductQuantity = typeof setCartProductQuantity;

export function setCartProductQuantity(productId: string, quantity: number): SetCartProductQuantity {
  return {
    type: ActionTypes.SET_CART_PRODUCT_QUANTITY,
    productId,
    quantity
  }
}
