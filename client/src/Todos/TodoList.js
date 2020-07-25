import React, { useState, useEffect, useContext } from "react";
import { contextObject } from "../Context/Store";
import todoOperations from "./ducks/operations";
import AddTodo from './AddTodo';
import Pagination from '../Pagination';
/**
 * @category Todos
 * @component
 * @hideconstructor
 * @classDesc 
 * TodoList Component.
 * Displays list of todo items and an add todo form
 * 
 */
const TodoList = () => {
  console.log('TodoList');
  /**
   * State update function returned by useState hook. Updates the state {@link http://127.0.0.1:5500/client/docs/TodoList.html#~elements elements}
   * @function updateElement
   * @memberof TodoList
   * @inner
   */
  /**
   * State object returned by useState hook. Updated by {@link http://127.0.0.1:5500/client/docs/TodoList.html#~updateElement updateElement} function returned by useState hook.
   * The TodoList from central store is loaded here & is used during data edit. The data here changes
   * as the user edits a todo. Used for controlling the elements.
   * @member elements {Object}
   * @memberof TodoList
   * @inner
   */
  const [elements, updateElement] = useState({});
  /**
   * [state,dispatch]
   * 
   * Returned by context object. This is an array of 2 elements i.e. state & dispatch returned by useReducer and added to context object.
   * Array consists of the activePageNumber i.e. the state used in pagination and dispatch method for updating the page number i.e. state
   * on clicking any of the paginator numbers.
   * @member activeNumber {Array}
   * @memberof TodoList
   * @inner
   */
  const { activeNumber } = useContext(contextObject);
  const [activePageNumber, dispatch1] = activeNumber;
  /**
   * [state,dispatch]
   * 
   * Returned by context object. This is an array of 2 elements i.e. state & dispatch returned by useReducer and added to context object.
   * Array consists of the todoList i.e. the state and dispatch method for updating the 
   * todolist on user actions like edit & delete.
   * @member todos {Array}
   * @memberof TodoList
   * @inner
   */
  const { todos } = useContext(contextObject);
  const [todoList, dispatch] = todos;
  
  /**
   * Returns array of elements for particular index of paginator
   * @param {number} activePageNumber The page number which is currently selected
   * @returns {Array}  
   */
  const displayList = (activePageNumber) => {
    if(((activePageNumber-1)*5)+5 <= todoList.length){
      return todoList.slice((activePageNumber-1)*5, ((activePageNumber-1)*5)+5);
    }
    
    else{
      return todoList.slice((activePageNumber-1)*5, todoList.length);
    }
    
  }
  const newTodoList = displayList(activePageNumber);
  /**
   * useEffect to fetch todolist after 1st render
   * @method useEffect[dispatch]
   * @memberof TodoList
   * @inner
   */
  useEffect(() => {
    const getItems = async () => {
      await todoOperations.fetchItems(dispatch);
    };
    getItems();
  }, [dispatch]);
  /**
   * useEffect for populating the state {@link http://127.0.0.1:5500/client/docs/TodoList.html#~elements elements} which controls the textboxes while editing.
   * @method useEffect[todoList]
   * @memberof TodoList
   * @inner
   */
  useEffect(() => {
    updateElement(() => ({}));
    todoList.forEach((element) => {
      updateElement((prevState) => ({
        ...prevState,
        [element._id]: { ...element, flag: 0 },
      }));
    });
  }, [todoList.length]);
  /**
   * Event handler for editing title
   * @param {string} id  
   */
  const handleTitleEdit = (e, id) => {
    const value = e.target.value;
    updateElement((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], title: value },
    }));
  };
  /**
   * Event handler for editing description
   * @param {string} id  
   */
  const handleDescriptionEdit = (e, id) => {
    const value = e.target.value;
    updateElement((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], description: value },
    }));
  };
  return (
    <div className="container-fluid p-3">
      <h1><u style={{ textDecorationSkipInk: 'none', display: 'flex', justifyContent: 'center' }}>To-Do List</u></h1><br/>
      <ul>
        {newTodoList.map((element) => {
          return (
            <li data-testid='todoItem' style={{display: 'flex', justifyContent: 'center'}}>
              <div className="card p-3 w-50">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-8">
                    <b>Title &emsp;&emsp;&emsp;&emsp;&nbsp;:&emsp;&nbsp; </b>
                        {Object.keys(elements).length != todoList.length ? (
                          element.title
                        ) : elements[element._id].flag === 0 ? (
                          element.title
                        ) : (
                          <input
                            type="text" className="form-control w-50 d-inline-flex"
                            data-testid="editTextBox"
                            value={elements[element._id].title}
                            onChange={(e) => {
                              handleTitleEdit(e, element._id);
                            }}
                          />
                        )}{" "}
                      <br />
                      <b>Description &emsp;:&emsp;</b> {'  '}
                      
                        {Object.keys(elements).length != todoList.length ? (
                          element.description
                        ) : elements[element._id].flag === 0 ? (
                          element.description
                        ) : (
                          <textarea
                            data-testid="editDescriptionBox" className="form-control w-50 d-inline"
                            value={elements[element._id].description}
                            onChange={(e) => {
                              handleDescriptionEdit(e, element._id);
                            }} style={{verticalAlign:'top'}}
                          />
                        )}{" "}
                    </div>
                    <div className="column" style={{marginLeft : 'auto'}}>
                      {Object.keys(elements).length != todoList.length ? (
                        <b>Null</b>
                      ) : elements[element._id].flag === 1 ? (
                        <button className="btn btn-primary"
                          href="#"
                          onClick={async (e) => {
                            await todoOperations.updateItem(
                              dispatch,
                              elements[element._id]
                            );
                            updateElement((prevState) => ({
                              ...prevState,
                              [element._id]: {
                                ...prevState[element._id],
                                flag: 0,
                              },
                            }));
                          }}
                        >
                          Save 
                        </button>
                      ) : (
                        <div>
                          <a href="#" style={{textDecoration : 'none', fontSize: '25px', padding:'20px'}}
                            className="fa fa-pencil"
                            onClick={() => {
                              updateElement((prevState) => ({
                                ...prevState,
                                [element._id]: {
                                  ...prevState[element._id],
                                  flag: 1,
                                },
                              }));
                            }}
                            data-testid="updateItem"
                          />
                          <a href="#"
                            className="fa fa-trash" style={{color:'maroon',textDecoration : 'none', fontSize: '25px'}}
                            onClick={async () => {
                              await todoOperations.deleteItem(
                                dispatch,
                                element._id
                              );
                            }}
                            data-testid="deleteItem"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
        
      </ul>
      <br />
      {todoList.length==0 ? '' : <Pagination listCount={todoList.length}/>} <br/>
      <AddTodo />
    </div>
  );
};
export default TodoList;
