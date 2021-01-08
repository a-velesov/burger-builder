import * as actionTypes from '../actions/actionTypes';
import {AnyAction} from "redux";

export interface IAction extends AnyAction {
  type: string;
  payload: {[key: string]: number};
}

export interface BurgerState {
  ingredients: {[key: string]: number},
  totalPrice: number,
}

const initialState: BurgerState = {
  ingredients: {},
  totalPrice: 0,
};

export const INGREDIENT_PRICES: {[key: string]: number} = {
  lettuce: 0.25,
  onion: 0.25,
  pickle: 0.5,
  tomato: 0.5,
  egg: 0.5,
  bacon: 1,
  cheese: 0.5,
  protein: 3,
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.ADD_INGRIDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };

    case actionTypes.REMOVE_INGRIDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };

    case actionTypes.SET_INGRIDIENTS:
      return {
        ...state,
        ingredients: {
          lettuce: action.ingredients.lettuce,
          onion: action.ingredients.onion,
          pickle: action.ingredients.pickle,
          tomato: action.ingredients.tomato,
          egg: action.ingredients.egg,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          protein: action.ingredients.protein,
        },
        totalPrice: 0,
      };

    default:
      return state;
  }
};

export default reducer;
