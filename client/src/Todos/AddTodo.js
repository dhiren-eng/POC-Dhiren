import React, {useState, useContext} from 'react';
import todoOperations from "./ducks/operations";
import { contextObject } from "../Context/Store";
/**
 * @namespace AddTodo
 * @category Todos
 * @component
 * @hideconstructor
 * @classDesc  
 * AddTodo Component.
 * Renders AddTodo form
 * 
 */
const AddTodo = () => {
  var a=0;
  /**
   * State update function returned by useState hook. Updates the state {@link http://127.0.0.1:5500/client/docs/TodoList.html#~elements state}
   * @function updateState
   * @memberof AddTodo
   * @inner
   */
   /**
   * State object returned by useState hook. Updated by {@link http://127.0.0.1:5500/client/docs/TodoList.html#~updateElement updateElement} function returned by useState hook.
   * Used for controlling the title and description elements.
   * @member state {{title : string, description : string}}
   * @memberof AddTodo
   * @inner
   */
    const [state, updateState] = useState({ title: "", description: "" });
    /**
   * [state,dispatch]
   * 
   * Returned by context object. This is an array of 2 elements i.e. state & dispatch returned by useReducer and added to context object.
   * Array consists of the todoList i.e. the state and dispatch method for updating the 
   * todolist on user actions like edit & delete.
   * @member todos {Array}
   * @memberof AddTodo
   * @inner
   */
    const { todos } = useContext(contextObject);
    const [todoList, dispatch] = todos;
    /**
   * Updates the state object {@link http://127.0.0.1:5500/client/docs/TodoList.html#~elements state} with the typed title in the AddTodo form
   * @memberof AddTodo
   * @inner
   */
    const handleTitle = (e) => {
        const value = e.target.value;
        updateState((prevState) => ({ ...prevState, title: value }));
      };
      /**
   * Updates the state object {@link http://127.0.0.1:5500/client/docs/TodoList.html#~elements state} with the typed description in the AddTodo form
   * @memberof AddTodo
   * @inner
   */
      const handleDescription = (e) => {
        const value = e.target.value;
        updateState((prevState) => ({ ...prevState, description: value }));
      };
    return (
      <div style={{display:'flex',justifyContent:'center'}}>
        <div className="card w-75">
        <div className="card-body">
          <form id="todoform">
          <input
            type="text"
            value={state.title}
            onChange={handleTitle}
            className="form-control"
            placeholder="To-Do Title"
          ></input>
          <br />
          <textarea
            type="text"
            value={state.description}
            onChange={handleDescription}
            className="form-control"
            placeholder="To-Do Description"
          ></textarea>
          <br />
          <button
            className="btn btn-primary"
            onClick={async (e) => {
              e.preventDefault();
              updateState((prevState) => ({...prevState, title:'',description:''}));
              await todoOperations.addItem(state, dispatch);
            }}
          >
            Add To-Do Item
          </button>
          </form>
        </div>
      </div>
      </div>
    )
}
export default AddTodo;