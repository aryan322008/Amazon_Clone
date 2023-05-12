import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { checkAdmin } from "../../../states/actions/authActions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Form = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if(!user){
            navigate("/auth")
        }
    }, []);

  const [formData, setformData] = useState({
    adminId:""
  });

  const Options = {
    
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
      
  };

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(checkAdmin({formData, Options, navigate}))
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformData({ ...formData, [name]: value });
  };

  

  return (
    <div className="container my-5">
      <div className="formContainer">
        <h2>Login as a Admin</h2>

        <form className="authForm" onSubmit={handleSubmit}>
          <div class="mb-3 inputContainer">
            <label for="exampleInputPassword1">Admin Id</label>
            <input
              type="text"
              id="exampleInputPassword1"
              name="adminId"
              className="input"
              onChange={handleChange}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
      <ToastContainer
          position="top-center"
          autoClose={2000}
          limit={2}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
    </div>
  );
};

export default Form;
