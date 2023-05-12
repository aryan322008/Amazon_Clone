export default (state=[], action) => {
    switch (action.type) {
     case "FETCH":
     return action.payload
     case "ADD_PRODUCT":
     return action.payload

     default:
        return state
    }
 }