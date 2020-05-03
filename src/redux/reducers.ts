import { ApplicationState, defaultState } from "./state";
import { SetCartProductQuantityAction, ToggleProductFavoriteAction } from "./actions";
import * as ActionTypes from './actionTypes';

// Union of all actions.
type Action = SetCartProductQuantityAction | ToggleProductFavoriteAction;

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
  }
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
  }
}

const updateState = (state: ApplicationState = defaultState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_CART_PRODUCT_QUANTITY:
      return setCartProductQuantity(state, action);
    case ActionTypes.TOGGLE_PRODUCT_FAVORITE:
      return toggleProductFavorite(state, action);
    default:
      return state;
  }
}

export default updateState;
