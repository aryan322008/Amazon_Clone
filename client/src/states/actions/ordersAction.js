import * as api from "../../api/index";

const addInOrders = (cartProducts) => async (dispatch) => {
  try {
    
    const {data} = await api.addInOrders(cartProducts)
    
    dispatch({type:"ADD_ORDER", payload:data})
    

  } catch (error) {
    console.log(error)
  }
};

const fetchHistory =  () => async (dispatch) => {
  try {
    
    const {data} = await api.fetchHistory()
    
    dispatch({type:"FETCH_ORDER_HISTORY", payload:data})
    

  } catch (error) {
    console.log(error)
  }
}

export { addInOrders, fetchHistory };

