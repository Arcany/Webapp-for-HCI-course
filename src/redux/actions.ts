import * as ActionTypes from './actionTypes';

export interface SetCartProductQuantityAction {
  type: ActionTypes.SET_CART_PRODUCT_QUANTITY;
  productId: string;
  quantity: number;
}

export interface ToggleProductFavoriteAction {
  type: ActionTypes.TOGGLE_PRODUCT_FAVORITE;
  productId: string;
}

export interface AddOriginFilterAction {
  type: ActionTypes.ADD_ORIGIN_FILTER;
  origin: string;
}

export interface RemoveOriginFilterAction {
  type: ActionTypes.REMOVE_ORIGIN_FILTER;
  origin: string;
}

export interface ClearCartAction {
  type: ActionTypes.CLEAR_CART;
}

export interface EditPaymentAction {
  type: ActionTypes.EDIT_PAYMENT;
  paymentPropertyKey: string;
  paymentPropertyValue: string | boolean;
}

export interface EditShippingAction {
  type: ActionTypes.EDIT_SHIPPING;
  shippingPropertyKey: string;
  shippingPropertyValue: string | boolean;
}

export type setCartProductQuantity = typeof setCartProductQuantity;
export type toggleProductFavorite = typeof toggleProductFavorite;
export type AddOriginFilter = typeof addOriginFilter;

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

export function addOriginFilter(origin: string): AddOriginFilterAction {
  return {
    type: ActionTypes.ADD_ORIGIN_FILTER,
    origin
  };
}

export function RemoveOriginFilter(origin: string): RemoveOriginFilterAction {
  return {
    type: ActionTypes.REMOVE_ORIGIN_FILTER,
    origin
  };
}

export function clearShoppingCart(): ClearCartAction {
  return {
    type: ActionTypes.CLEAR_CART
  };
}

export function editPaymentInformation(paymentPropertyKey: string, paymentPropertyValue: string|boolean): EditPaymentAction {
  return {
    type: ActionTypes.EDIT_PAYMENT,
    paymentPropertyKey,
    paymentPropertyValue
  };
}

export function editShippingInformation(shippingPropertyKey: string, shippingPropertyValue: string|boolean): EditShippingAction {
  return {
    type: ActionTypes.EDIT_SHIPPING,
    shippingPropertyKey,
    shippingPropertyValue
  };
}
