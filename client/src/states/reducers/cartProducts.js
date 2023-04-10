export default (state=[], action) => {
   switch (action.type) {
    case "FETCH":
    return action.payload

    case "ADD" : 
    return [...state, action.payload]
    default:
       return state
   }
}