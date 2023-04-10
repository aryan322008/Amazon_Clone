import axios from "axios"

const fetchItem = async () => {
    return await axios.get('http://localhost:5000/items/getItem')
}

const fetchCartItem = async () => {
    return await axios.get('http://localhost:5000/getCartItem')
}

const addCartItem = async (itemDetail) => {
    return await axios.post('http://localhost:5000/addCartItem', itemDetail)
}

export { fetchItem, fetchCartItem, addCartItem }