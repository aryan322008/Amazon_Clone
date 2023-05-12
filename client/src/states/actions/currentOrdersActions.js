import * as api from "../../api/index";

const addInCurrentOrders = (cartProducts) => async (dispatch) => {

    const {data} = await api.addInCurrentOrders(cartProducts)

    console.log(data)
    
    dispatch({type:"Add_Current_Orders", payload:data})
}

const fecthOrders = () => async (dispatch) => {
    const {data}  = await api.fecthOrders()

    console.log(data)

    dispatch({type:"FETCH_ORDERS", payload:data})
}


export {addInCurrentOrders, fecthOrders} 