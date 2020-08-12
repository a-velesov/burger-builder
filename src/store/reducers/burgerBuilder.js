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
  totalPrice: 0,
};

const reducer = (state = initialState, action) => {

  switch(action.type) {
    case actionTypes.ADD_INGRIDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName + 1]
        }
      };

    case actionTypes.REMOVE_INGRIDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName - 1]
        }
      };


    default:
      return  state
  }

};

export default reducer;