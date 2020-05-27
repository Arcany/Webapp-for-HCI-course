import * as ActionTypes from './actionTypes';
import { ToastData } from './state';
import shortid from 'shortid';

/**
 * Shopping cart
 */
export interface SetCartProductQuantityAction {
  type: ActionTypes.SET_CART_PRODUCT_QUANTITY;
  productId: string;
  quantity: number;
}

export interface ClearCartAction {
  type: ActionTypes.CLEAR_CART;
}

export interface SetProductRemovalUndoButtonProductAction {
  type: ActionTypes.SET_PRODUCT_REMOVAL_UNDO_BUTTON_PRODUCT;
  productId: string | null;
} 

export interface UndoLastCartRemovalAction {
  type: ActionTypes.UNDO_LAST_CART_REMOVAL;
}

export function setCartProductQuantity(productId: string, quantity: number): SetCartProductQuantityAction {
  return {
    type: ActionTypes.SET_CART_PRODUCT_QUANTITY,
    productId,
    quantity
  };
}

export function clearShoppingCart(): ClearCartAction {
  return {
    type: ActionTypes.CLEAR_CART
  };
}

export function setProductRemovalUndoButtonProduct(productId: string | null): SetProductRemovalUndoButtonProductAction {
  return {
    type: ActionTypes.SET_PRODUCT_REMOVAL_UNDO_BUTTON_PRODUCT,
    productId
  };
}

export function undoLastCartRemoval(): UndoLastCartRemovalAction {
  return {
    type: ActionTypes.UNDO_LAST_CART_REMOVAL
  };
}


/**
 * Favorites
 */
export interface ToggleProductFavoriteAction {
  type: ActionTypes.TOGGLE_PRODUCT_FAVORITE;
  productId: string;
}

export function toggleProductFavorite(productId: string): ToggleProductFavoriteAction {
  return {
    type: ActionTypes.TOGGLE_PRODUCT_FAVORITE,
    productId
  };
}


/**
 * Filters
 */
export interface AddOriginFilterAction {
  type: ActionTypes.ADD_ORIGIN_FILTER;
  origin: string;
}

export interface RemoveOriginFilterAction {
  type: ActionTypes.REMOVE_ORIGIN_FILTER;
  origin: string;
}

export interface SetFavoriteFilterAction {
  type: ActionTypes.SET_FAVORITE_FILTER;
  filter: boolean;
}

export interface SetSearchFilterAction {
  type: ActionTypes.SET_SEARCH_FILTER;
  filter: string;
}

export interface ClearFiltersAction {
  type: ActionTypes.CLEAR_FILTERS;
}

export function addOriginFilter(origin: string): AddOriginFilterAction {
  return {
    type: ActionTypes.ADD_ORIGIN_FILTER,
    origin
  };
}

export function removeOriginFilter(origin: string): RemoveOriginFilterAction {
  return {
    type: ActionTypes.REMOVE_ORIGIN_FILTER,
    origin
  };
}

export function setFavoriteFilter(filter: boolean): SetFavoriteFilterAction {
  return {
    type: ActionTypes.SET_FAVORITE_FILTER,
    filter
  };
}

export function setSearchFilter(filter: string): SetSearchFilterAction {
  return {
    type: ActionTypes.SET_SEARCH_FILTER,
    filter
  };
}

export function clearFilters(): ClearFiltersAction {
  return {
    type: ActionTypes.CLEAR_FILTERS
  };
}


/**
 * Payment and Shipping
 */
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


/**
 * Toasts
 */
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
