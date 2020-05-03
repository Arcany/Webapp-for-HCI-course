import * as ActionTypes from './actionTypes'

export interface SetCartProductQuantityAction {
  type: ActionTypes.SET_CART_PRODUCT_QUANTITY,
  productId: string;
  quantity: number;
}

export interface ToggleProductFavoriteAction {
  type: ActionTypes.TOGGLE_PRODUCT_FAVORITE,
  productId: string;
}

export type setCartProductQuantity = typeof setCartProductQuantity;
export type toggleProductFavorite = typeof toggleProductFavorite;

export function setCartProductQuantity(productId: string, quantity: number): SetCartProductQuantityAction {
  return {
    type: ActionTypes.SET_CART_PRODUCT_QUANTITY,
    productId,
    quantity
  };
}

export function toggleProductFavorite(productId: string): ToggleProductFavoriteAction {
  return {
    type: ActionTypes.TOGGLE_PRODUCT_FAVORITE,
    productId
  };
}
