/**
 * Reducer for updating the context object in Store.js
 * @module
 * @category Todos
 * @subcategory Reducers
 */
/**
   * @param {Array} state Previous state holding the Array of todo items
   * @param {Object} action Action object passed as parameter to dispatch function in operations
   * @returns {Object} Updated state
   */
const todoReducer = (state, action) => {
  switch (action.type) {
    case "GET_LIST":
      return action.payload;
    default:
      return state;
  }
};
export default todoReducer;
