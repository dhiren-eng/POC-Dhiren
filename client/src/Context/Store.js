/**
 * Central store which creates the context object & renders the TodoList wrapped with provider of context object
 * and makes use of useReducers that take the respective module reducers as parameters.
 * @namespace store
 * @category Context
 * @subcategory Store
 */
import React, { useReducer, createContext } from "react";
import todoReducer from "../Todos/ducks/reducer";
import paginationReducer from '../Pagination/ducks/reducer';
import PropTypes from 'prop-types';
/**
 * Acts as a central store holding the state data of the application
 * @member {Object} contextObject
 * @memberof store
 */
var contextObject = createContext();
const { Provider } = contextObject;
var store;
/**
 * @category Context
 * @component
 * @hideconstructor
 * @classDesc 
 * StateProvider component.
 * Renders the TodoList wrapped with provider of context object
 * and makes use of useReducers that take the respective module reducers as parameters.
 */
const StateProvider = (props) => {
  /**
   * Dispatch function returned by useReducer hook. Updates the state {@link http://127.0.0.1:5500/client/docs/StateProvider.html#~todoList todoList}
   * @function dispatch
   * @memberof StateProvider
   * @inner
   */
  /**
   * State object returned by useReducer hook. Updated by {@link http://127.0.0.1:5500/client/docs/StateProvider.html#~dispatch dispatch} function returned by useReducer hook.
   * Contains the todoList array.
   * @member todoList {Array<Object>}
   * @memberof StateProvider
   * @inner
   */
  var [todoList, dispatch] = useReducer(todoReducer, []);
    /**
   * Dispatch function returned by useReducer hook. Updates the state {@link http://127.0.0.1:5500/client/docs/StateProvider.html#~activePageNumber activePageNumber}
   * @function dispatch1
   * @memberof StateProvider
   * @inner
   */
  /**
   * State object returned by useReducer hook. Updated by {@link http://127.0.0.1:5500/client/docs/StateProvider.html#~dispatch1 dispatch1} function returned by useReducer hook.
   * Contains the todoList array.
   * @member activePageNumber {Array<number>}
   * @memberof StateProvider
   * @inner
   */
  var [activePageNumber, dispatch1] = useReducer(paginationReducer,1);
  console.log(activePageNumber);
  /**
   * Object passed as value to Provider component. Is defined as :
   * @example
   * store = {
   * todos: [todoList, dispatch],
   * activeNumber : [activePageNumber, dispatch1],
   * };
   * @member store {Object<string, array>}
   * @memberof StateProvider
   * @inner
   */
  store = {
    todos: [todoList, dispatch],
    activeNumber : [activePageNumber, dispatch1],
  };
  return <Provider value={store}>{props.children}</Provider>;
};
StateProvider.propTypes = {
  /**
     * The ToDoList react element to be wrapped with provider
     */
  children: PropTypes.element,
}
export default StateProvider;
export { contextObject, store };
