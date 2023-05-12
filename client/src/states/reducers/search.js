export default (state=[{}], action) => {
    switch (action.type) {
     case "FETCH_SEARCH_ITEMS":
     return action.payload

     case "GET_SEARCH_ITEMS" : 
     return action.payload
     default:
        return state
    }
 }