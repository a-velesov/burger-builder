import * as actionTypes from './../actions/actionTypes';

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGRIDIENTS,
    ingredientName: name
  }
}
export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGRIDIENTS,
    ingredientName: name
  }
}