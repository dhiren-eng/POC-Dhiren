/**
 * @module
 * @category Pagination
 * @subcategory Reducers
 */
/**
   * @param {number} state Previous state holding the previos selected page from paginator
   * @param {Object} action Action object passed as parameter to dispatch function in operations when a new page number is clicked
   * @returns {Object} Updated state
   */
const paginationReducer = (state, action) => {
    switch(action.type){
        case 'UPDATE_PAGENUMBER' :
            return action.payload ;
        default :
            return state;
    }
}
export default paginationReducer;