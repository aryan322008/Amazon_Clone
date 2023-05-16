import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import InfoIcon from "@mui/icons-material/Info";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/amazon-logo.png";
import { register, login } from "../../states/actions/authActions";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Link, useNavigate } from "react-router-dom";

const Auth = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({ admin: false });
  const [password, setPassword] = useState(false);
  const navigate = useNavigate();
  const Options = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    !isLoggedIn
      ? dispatch(register({ formData, Options, navigate }))
      : dispatch(login({ formData, Options, navigate }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordDisplay = (e) => {
    e.preventDefault();
    setPassword(!password);
  };

  return (
    <>
      <div className="authContainer">
        <div className="logo">
          <img src={logo} />
          <span className="img_span">.in</span>
        </div>

        <div className="formContainer">
          <h2>{`${!isLoggedIn ? "Create" : "Login"}`} Account</h2>
          <form className="authForm" onSubmit={handleSubmit}>
            {/* Make a seprate components for input */}

            {!isLoggedIn && (
              <div className="inputContainer">
                <label for="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="First and Last Name"
                  onChange={handleChange}
                  className="input"
                />
              </div>
            )}

            <div className="inputContainer">
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="email"
                id="email"
                onChange={handleChange}
                className="input"
              />
            </div>

            <div className="inputContainer">
              <div className="w-100 d-flex justify-content-between align-items-center">
                <label for="password">Password</label>

                {isLoggedIn && (
                  <Link to="/auth/forgot-password">
                    <span className="forgotPass">Forgot Password</span>
                  </Link>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <input
                  type={`${password ? "password" : "text"}`}
                  name="password"
                  placeholder="At least 6 Characters"
                  id="password"
                  style={{ marginBottom: "0.2rem" }}
                  onChange={handleChange}
                  className="input"
                />
                <button
                  className="password_btn"
                  onClick={handlePasswordDisplay}
                >
                  {password ? (
                    <RemoveRedEyeOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
                </button>
              </div>
              <span className="passwordText">
                <InfoIcon style={{ fontSize: "1rem" }} />
                Passwords must be at least 6 characters.{" "}
              </span>
            </div>

            <div class="mb-3 form-check" style={{ width: "100%" }}>
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
                name="admin"
                onChange={(event) =>
                  setFormData({ ...formData, admin: event.target.checked })
                }
              />
              <label class="form-check-label" for="exampleCheck1">
                {`${!isLoggedIn ? "Make me Admin" : "Create new Admin id"}`}
              </label>
            </div>

            <div className="policy">
              By enrolling your mobile phone number, you consent to receive
              automated security notifications via text message from Amazon.
              Message and data rates may apply.
            </div>

            <button type="submit">Continue</button>
          </form>

          <div className="changePageLink">
            {!isLoggedIn
              ? `Already have an account? `
              : `Don't have an account`}
            <span
              className="delete"
              onClick={() => {
                setIsLoggedIn(!isLoggedIn);
              }}
            >
              {" "}
              {!isLoggedIn ? `Sign in` : `register`}
            </span>
          </div>
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

export default Auth;
