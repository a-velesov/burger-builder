import * as actionTypes from './../actions/actionTypes';
import axios from '../../Axios/axios-orders';

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGRIDIENTS,
    ingredientName: name,
  };
};
export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGRIDIENTS,
    ingredientName: name,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGRIDIENTS,
    ingredients: ingredients,
  };
};

export const resetIngredients = () => {
  return {
    type: actionTypes.RESET_INGRIDIENTS,
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios.get('https://burger-b6263.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data))
      })
      .catch(e => {
        console.log(e);
      });
  };
};