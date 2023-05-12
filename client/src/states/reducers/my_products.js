export default (state=[], action) => {
    switch (action.type) {
     case "FETCH_MY_PRODUCTS":
     return action.payload

     case "DELETE_MY_PRODUCTS" : 
     return action.payload

     default:
        return state
    }
 }