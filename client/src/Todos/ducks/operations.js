/**
 * Functions used for making api requests and dispatching actions.
 * These functions are called from the components.
 * @module
 * @category Todos
 * @subcategory Operations
 */
import axios from "axios";
/**
   * Operation for adding the todo item when button Add TodoItem is clicked.
   * @param {Object} todoItem Todo item passed by the component to be added
   * @param {Function} dispatch Dispatch function passed by the component to change the context object containing todoList.
   */
const addItem = async (todoItem, dispatch) => {
  try {
    await axios.post("/api/category", todoItem);
    await fetchItems(dispatch);
  } catch (error) {
    console.log(error);
  }
};
/**
   * Operation for fetching todoItems and populating the context object.
   * @param {Function} dispatch Disaptch function passed by the component to change the context object containing todoList.
   */
const fetchItems = async (dispatch) => {
  try {
    const items = await axios.get("/api/category/all");
    console.log(items);
    dispatch({ type: "GET_LIST", payload: items.data });
  } catch (error) {
    console.log(error);
  }
};
/**
   * Operation for updating individual todoItems and populating the context object with the update.
   * @param {Object} item Todo item passed by the component to be updated
   * @param {Function} dispatch Disaptch function passed by the component to change the context object containing todoList to change
   */
const updateItem = async (dispatch, item) => {
  try {
    const res = await axios.put(`/api/category/${item._id}`, item);
    await fetchItems(dispatch);
  } catch (error) {
    console.log(error);
  }
};
/**
   * Operation for deleting particular todoItem and populating the context object with the updates todoList.
   * @param {string} id Id of todo item to be deleted passed by the component
   * @param {Function} dispatch Disaptch function passed by the component to change the context object containing todoList to change
   */
const deleteItem = async (dispatch, id) => {
  try {
    await axios.delete(`/api/category/${id}`);
    await fetchItems(dispatch);
  } catch (error) {
    console.log(error);
  }
};
export default { addItem, fetchItems, updateItem, deleteItem };
