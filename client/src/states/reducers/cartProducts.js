export default (state=[], action) => {
   switch (action.type) {
    case "FETCH_CART":
    return action.payload

    case "ADD" : 
    return [...state, action.payload]
    default:
       return state
   }
}