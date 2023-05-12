export default (state={}, action) => {
    switch (action.type) {
     
     case "FETCH_DETAILS":
     return action.payload
 
     default:
        return state
    }
 }