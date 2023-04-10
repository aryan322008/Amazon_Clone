import { combineReducers} from 'redux'
import cartProducts from "./cartProducts"
import products from "./products"

export default combineReducers({cartProducts, products})
