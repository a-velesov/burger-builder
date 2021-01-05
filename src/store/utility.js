// example of how to refactor the store

export const updateObject = (oldObject, updatedProperties) => ({
  ...oldObject,
  ...updatedProperties,
});
