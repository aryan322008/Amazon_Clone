import React,{useState, useEffect} from "react";
import FormComponent from "../../admin/login/formContainer/formComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {forgotPassword} from "../../../states/actions/authActions"

const ForgotPassword = () => {
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
      
      dispatch(forgotPassword({email:formData.email, Options, navigate}))

  };

  return (
    <>
      <FormComponent
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        title={"Send Verification Code to your email"}
        fieldLabel={"Email"}
        fieldName={"email"}
      />
    </>
  );
};

export default ForgotPassword;
