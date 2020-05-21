import * as ActionTypes from './actionTypes';
import { ToastData } from './state';
import shortid from 'shortid';

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



export interface AddToastAction {
  type: ActionTypes.ADD_TOAST;
  toastData: ToastData;
}

export interface RemoveToastAction {
  type: ActionTypes.REMOVE_TOAST;
  toastId: string;
}

export function addToast(title: string, body: JSX.Element, delay: number|undefined = undefined): AddToastAction {
  return {
    type: ActionTypes.ADD_TOAST,
    toastData: {
      title,
      body,
      delay,
      id: shortid.generate()
    }
  };
}

export function addToastWithId(id: string, title: string, body: JSX.Element, delay: number|undefined = undefined): AddToastAction {
  return {
    type: ActionTypes.ADD_TOAST,
    toastData: {
      id,
      title,
      body,
      delay
    }
  };
}

export function removeToast(toastId: string): RemoveToastAction {
  return {
    type: ActionTypes.REMOVE_TOAST,
    toastId
  };
}

// export type AddToastFunction = typeof addToast;
// export type RemoveToastFunc = typeof removeToast;