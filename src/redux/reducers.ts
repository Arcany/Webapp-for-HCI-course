import { ApplicationState, defaultState } from "./state";
import { SetCartProductQuantity as SetCartProductQuantityAction } from "./actions";
import * as ActionTypes from './actionTypes';

// Union of all actions.
type Action = SetCartProductQuantityAction;

function setCartProductQuantity(state: ApplicationState, action: SetCartProductQuantityAction): ApplicationState {
  const newState: ApplicationState = {...state};
  const quantity = Math.floor(action.quantity);
  if (action.quantity <= 0) {
    delete newState.cart[action.productId];
  } else {
    newState.cart[action.productId] = {
      quantity
    }
  }

  return newState;
}

const updateState = (state: ApplicationState = defaultState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_CART_PRODUCT_QUANTITY:
      return setCartProductQuantity(state, action);
    default:
      return state;
  }
}

export default updateState;
