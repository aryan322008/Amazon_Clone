export default (state={loader:false, display:false}, action) => {
    switch (action.type) {
     case "SEARCH_DISPLAY":
     return {...state,...action.payload}
     default:
        return state
    }
 }