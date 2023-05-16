import React, { useState, useEffect } from "react";
import { checkAdmin } from "../../../states/actions/authActions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormComponent from "../../admin/login/formContainer/formComponent";
import { ToastContainer } from "react-toastify";
import { resetPassword } from "../../../states/actions/authActions";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setformData] = useState({
    email: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/auth");
    }
  }, []);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { verification_code, new_password, confirm_password , email } = formData;

    if (new_password === confirm_password) {
      dispatch(
        resetPassword({
          veriCode: verification_code,
          newPass: new_password,
          email,
          Options,
          navigate,
        })
      );
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="formContainer">
          <h2 style={{ textAlign: "center" }}>
            Enter Verification code and resent password
          </h2>

          <form className="authForm" onSubmit={handleSubmit}>
            <div class="mb-3 inputContainer">
              <label for="exampleInputPassword1">Code:</label>
              <input
                type="text"
                id="exampleInputPassword1"
                name="verification_code"
                className="input"
                onChange={handleChange}
              />
            </div>
            <div class="mb-3 inputContainer">
              <label for="exampleInputPassword1">email:</label>

              <input
                type="text"
                id="exampleInputPassword1"
                name="email"
                className="input"
                onChange={handleChange}
              />
            </div>
            <div class="mb-3 inputContainer">
              <label for="exampleInputPassword1">new password:</label>
              <input
                type="text"
                id="exampleInputPassword1"
                name="new_password"
                className="input"
                onChange={handleChange}
              />
            </div>
            <div class="mb-3 inputContainer">
              <label for="exampleInputPassword1">confirm password:</label>

              <input
                type="text"
                id="exampleInputPassword1"
                name="confirm_password"
                className="input"
                onChange={handleChange}
              />
            </div>

            <button type="submit">Continue</button>
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
    </>
  );
};

export default ResetPassword;
