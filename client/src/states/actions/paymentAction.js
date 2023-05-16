import * as api from "../../api/index";

const create_checkout_session = ({id, qty}) => async (dispatch) => {
    const {data}  = await api.create_checkout_session({id, qty})

    if(data.url) {
        window.location.href = `${data.url}`
    }
}


export {create_checkout_session} 