import * as api from "../../api/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getItems = () => async (dispatch) => {
  try {
    const { data } = await api.fetchItem();

    dispatch({ type: "FETCH", payload: data });
  } catch (error) {
    console.log(error);
  }
};

const addItem =
  ({ formData, Options }) =>
  async (dispatch) => {
    try {
      const response = await api
        .addItem(formData)

        .then(({ data }) => {
          toast("item added successfully", Options);
          dispatch({ type: "ADD_PRODUCT", payload: data });
        })
        
        .catch(({ response }) => {
          if (response.data.errors) {
            response.data.errors.map((element, index) => {
              toast.error(`${(index, element.msg)}`, Options);
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

const addCartItem = ({id, qty}) => async (dispatch) => {
  try {
    const { data } = await api.addCartItem({id, qty});

    dispatch({ type: "ADD", payload: data });
  } catch (error) {
    console.log(error);
  }
};

const getCartItems = () => async (dispatch) => {
  try {
    const { data } = await api.fetchCartItem();

    dispatch({ type: "GET_CART_ITEMS", payload: data });
  } catch (error) {
    console.log(error);
  }
};
const deleteCartItem = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteCartItem(id);

    dispatch({ type: "DELETE_CART_ITEMS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

const updateCartQty = (updateVal) => async (dispatch) => {
  const { data } = await api.updateCartQty(updateVal);

  dispatch({ type: "UPDATE_QTY", payload: data });
};

export {
  getItems,
  addCartItem,
  getCartItems,
  deleteCartItem,
  updateCartQty,
  addItem,
};
