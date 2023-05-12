export default (state=[], action) => {
    switch (action.type) {
     case "Add_Current_Orders":
     return action.payload

     case "FETCH_ORDERS":
     return [...action.payload]

     default:
        return state
    }
 }