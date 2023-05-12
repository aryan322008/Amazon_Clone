import * as api from "../../api/index"

const setPriceAction = (value) => (dispatch) => {
    dispatch({type:"INCREMENT" , payload: value});
}

export {setPriceAction}