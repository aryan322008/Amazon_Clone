import * as api from "../../api/index"

const getItems = () => async (dispatch) => {
        try {
        
        const {data} = await api.fetchItem()
 
        dispatch({type:"FETCH", payload: data })

        } catch (error) {

             console.log(error)   
        }
}
const addItem = (itemDetail) => async (dispatch) => {
        try {
                
                const {data} = await api.addCartItem(itemDetail)

                dispatch({type:"ADD", payload:data})
                
        } catch (error) {

                console.log(error)   
        }
}

export {getItems, addItem}