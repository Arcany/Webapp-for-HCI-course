import { ApplicationState, defaultState } from './state';
import { SetCartProductQuantityAction, ToggleProductFavoriteAction, AddOriginFilterAction, RemoveOriginFilterAction, ClearCartAction, EditPaymentAction, EditShippingAction, RemoveToastAction, AddToastAction, ClearFiltersAction, SetSearchFilterAction, SetFavoriteFilterAction } from './actions';
import * as ActionTypes from './actionTypes';

// Union of all actions.
type Action = SetCartProductQuantityAction | ClearCartAction
    | ToggleProductFavoriteAction
    | AddOriginFilterAction | RemoveOriginFilterAction | SetFavoriteFilterAction | SetSearchFilterAction | ClearFiltersAction
    | EditPaymentAction | EditShippingAction
    | AddToastAction | RemoveToastAction;

function setCartProductQuantity(state: ApplicationState, action: SetCartProductQuantityAction): ApplicationState {
  // const newState: ApplicationState = {...state};
  const quantity = Math.max(0, Math.floor(action.quantity));

  return {
    ...state,
    products: {
      ...state.products,
      [action.productId]: {
        ...state.products[action.productId],
        cartAmount: quantity
      }
    }
  };
}

function clearShoppingCart(state: ApplicationState, action: ClearCartAction): ApplicationState {
  return {
    ...state,
    products: Object.fromEntries(
      Object.entries(state.products).map(([id, product]) => {return [id, {...product, cartAmount: undefined}];})
    )
  };
}



function toggleProductFavorite(state: ApplicationState, action: ToggleProductFavoriteAction): ApplicationState {
  return {
    ...state,
    products: {
      ...state.products,
      [action.productId]: {
        ...state.products[action.productId],
        isFavorite: !state.products[action.productId].isFavorite
      }
    }
  };
}



function addOriginFilter(state: ApplicationState, action: AddOriginFilterAction): ApplicationState {
  return {
    ...state,
    originFilters: [
      ...state.originFilters,
      action.origin
    ]
  };
}

function removeOriginFilter(state: ApplicationState, action: RemoveOriginFilterAction): ApplicationState {
  return {
    ...state,
    originFilters: [
      ...state.originFilters.filter(v => v !== action.origin),
    ]
  };
}

function setFavoriteFilter(state: ApplicationState, action: SetFavoriteFilterAction): ApplicationState {
  return {
    ...state,
    favoriteFilter: action.filter
  };
}

function setSearchFilter(state: ApplicationState, action: SetSearchFilterAction): ApplicationState {
  return {
    ...state,
    searchFilter: action.filter
  };
}

function clearFilters(state: ApplicationState, action: ClearFiltersAction): ApplicationState {
  return {
    ...state,
    originFilters: [],
    favoriteFilter: false
  };
}



function editPaymentInformation(state: ApplicationState, action: EditPaymentAction): ApplicationState {
  return {
    ...state,
    paymentInformation: Object.fromEntries(
      Object.entries(state.paymentInformation).map(([key, value]) => {
        if (key === action.paymentPropertyKey) return [key, action.paymentPropertyValue];
        return [key, value];
      })
    )
  };
}

function editShippingInformation(state: ApplicationState, action: EditShippingAction): ApplicationState {
  return {
    ...state,
    shippingInformation: Object.fromEntries(
      Object.entries(state.shippingInformation).map(([key, value]) => {
        if (key === action.shippingPropertyKey) return [key, action.shippingPropertyValue];
        return [key, value];
      })
    )
  };
}



function addToast(state: ApplicationState, action: AddToastAction): ApplicationState {
  return {
    ...state,
    toasts: {
      ...state.toasts,
      [action.toastData.id]: {
        id: action.toastData.id,
        title: action.toastData.title,
        body: action.toastData.body,
        delay: action.toastData.delay
      }
    }
  };
}

function removeToast(state: ApplicationState, action: RemoveToastAction): ApplicationState {
  return {
    ...state,
    toasts: Object.fromEntries(
      Object.entries(state.toasts).filter(([id, toast]) => id !== action.toastId)
    )
  };
}

const updateState = (state: ApplicationState = defaultState, action: Action) => {
  switch (action.type) {
  case ActionTypes.SET_CART_PRODUCT_QUANTITY:
    return setCartProductQuantity(state, action);
  case ActionTypes.CLEAR_CART:
    return clearShoppingCart(state, action);

  case ActionTypes.TOGGLE_PRODUCT_FAVORITE:
    return toggleProductFavorite(state, action);

  case ActionTypes.ADD_ORIGIN_FILTER:
    return addOriginFilter(state, action);
  case ActionTypes.REMOVE_ORIGIN_FILTER:
    return removeOriginFilter(state, action);
  case ActionTypes.SET_FAVORITE_FILTER:
    return setFavoriteFilter(state, action);
  case ActionTypes.SET_SEARCH_FILTER:
    return setSearchFilter(state, action);
  case ActionTypes.CLEAR_FILTERS:
    return clearFilters(state, action);

  case ActionTypes.EDIT_PAYMENT:
    return editPaymentInformation(state, action);
  case ActionTypes.EDIT_SHIPPING:
    return editShippingInformation(state, action);

  case ActionTypes.ADD_TOAST:
    return addToast(state, action);
  case ActionTypes.REMOVE_TOAST:
    return removeToast(state, action);
  default:
    return state;
  }
};

export default updateState;
