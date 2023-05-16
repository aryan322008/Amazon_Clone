import React from "react";
import { ToastContainer } from "react-toastify";

const FormComponent = ({handleSubmit, title, handleChange, fieldLabel, fieldName }) => {
  return (
    <div className="container my-5">
      <div className="formContainer">
        <h2
        style={{textAlign: "center"}}
        >{title}</h2>

        <form className="authForm" onSubmit={handleSubmit}>
          <div class="mb-3 inputContainer">
            <label for="exampleInputPassword1">{fieldLabel}</label>
            <input
              type="text"
              id="exampleInputPassword1"
              name={fieldName}
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
  );
};

export default FormComponent;
