import React, {useContext} from 'react';
import {contextObject} from '../Context/Store';
import PropTypes from 'prop-types';
/**
 * @category Pagination
 * @component
 * @hideconstructor
 * @classDesc
 * Pagination Component
 */
const Pagination = (props) => {
    /**
   * [state,dispatch]
   * 
   * Returned by context object. This is an array of 2 elements i.e. state & dispatch returned by useReducer and added to context object.
   * Array consists of the activePageNumber i.e. the state used in pagination and dispatch method for updating the page number i.e. state
   * on clicking any of the paginator numbers.
   * @member activeNumber {Array}
   * @memberof Pagination
   * @inner
   */
    const { activeNumber } = useContext(contextObject);
    const [activePageNumber, dispatch1] = activeNumber;
    console.log(activePageNumber);
    /**
     * Displays the paginator i.e. the list of numbers as buttons according to the number of items in todoList
     * @returns {Array} JSX of array of pagenumber buttons wrapped in li
     */
    const showPageButtons = () => {
        var arr = [];
        for(var i=0; i<Math.ceil(props.listCount/5) ; i++){
            arr.push(<li key={i+1} className={`page-item ${activePageNumber==i+1 ? 'active' : ''}`} ><button className="page-link" key={i+1} onClick={(e) => {
                e.preventDefault();
                dispatch1({type : 'UPDATE_PAGENUMBER', payload : e.target.innerText});
            }}>{i+1}</button></li>);
                }
                return arr;
    }
    return (
        <nav className="container-fluid d-flex" style={{justifyContent : 'center'}}>
        <ul className="pagination" >
        <li className="page-item"><button className="page-link">Previous</button></li>
            {
                showPageButtons()
            }
            <li className="page-item"><button className="page-link">Next</button></li>
        </ul>
      </nav>
    )
}
Pagination.propTypes = {
    /**
     * Count of list elements to determine no. of indices in Pagination
     */
    listCount : PropTypes.number.isRequired
}
export default Pagination;