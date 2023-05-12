import * as api from "../../api/index";

const fetch_my_products = () => async (dispatch) => {
    const {data}  = await api.fetch_my_products()

    dispatch({type:"FETCH_MY_PRODUCTS", payload:data})
}

const delete_my_products = (id) => async (dispatch) => {
    const {data}  = await api.delete_my_products(id)

    dispatch({type:"DELETE_MY_PRODUCTS", payload:data})
}

export {delete_my_products, fetch_my_products} 