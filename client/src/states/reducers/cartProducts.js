export default (state=[], action) => {
   switch (action.type) {
    
    case "FETCH_CART":
    return action.payload

    case "GET_CART_ITEMS":
      return action.payload

    case "DELETE_CART_ITEMS":
      return action.payload

    case "UPDATE_QTY":
      return action.payload

    case "ADD" : 
    return [...action.payload]

    default:
       return state
   }
}