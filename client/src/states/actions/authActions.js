import * as api from "../../api/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const register =
  ({ formData, Options, navigate }) =>
  async (dispatch) => {
    try {
      const response = await api
        .register(formData)

        .then(({ data }) => {
          data.adminId
            ? toast(`${data.adminId} Your Admin Id`, Options)
            : toast(`logged in successfully`, Options);
          dispatch({ type: "REGISTER", payload: data });

          setTimeout(() => {
            navigate("/");
          }, 1000);
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

const login =
  ({ formData, Options, navigate }) =>
  async (dispatch) => {
    try {
      const response = await api
        .login(formData)

        .then(({ data }) => {
          data.adminId
            ? toast(`${data.adminId} Your Admin Id`, Options)
            : toast(`logged in successfully`, Options);
          dispatch({ type: "LOGIN", payload: data });
       
          setTimeout(() => {
            navigate("/");
          }, 3000);
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

const checkAdmin =
  ({ formData, Options, navigate }) =>
  async (dispatch) => {
    try {
      const response = await api
        .checkAdmin(formData)

        .then(({ data }) => {
          toast(`${data.admin_verified && "You are verified"} `, Options);
          localStorage.setItem("admin_verified", data.admin_verified);

          navigate("/admin/add_products");
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

export { register, login, checkAdmin };
