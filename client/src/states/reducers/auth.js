export default (state="", action) => {
    switch (action.type) {
     case "REGISTER":
      localStorage.setItem("user", JSON.stringify(action.payload))
     return action.payload

     case "LOGIN" : 
     localStorage.setItem("user", JSON.stringify(action.payload))
     return action.payload
     default:
        return state
    }
 }