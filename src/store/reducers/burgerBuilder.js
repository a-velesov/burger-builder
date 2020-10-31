import * as actionTypes from './../actions/actionTypes';

const initialState = {
  ingredients: {
    lettuce: 1,
    onion: 1,
    pickle: 0,
    tomato: 0,
    egg: 0,
    bacon: 1,
    cheese: 1,
    protein: 1,
  },
  totalPrice: 5,
};

export const INGREDIENT_PRICES = {
  lettuce: 0.25,
  onion: 0.25,
  pickle: 0.75,
  tomato: 0.5,
  egg: 0.75,
  bacon: 0.75,
  cheese: 0.5,
  protein: 2.75,
};

const reducer = (state = initialState, action) => {

  switch(action.type) {
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

    default:
      return state;
  }

};

export default reducer;