import React, { useState, useEffect } from "react";
import { checkAdmin } from "../../../states/actions/authActions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormComponent from "./formContainer/formComponent";

const Form = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/auth");
    }
  }, []);

  const [formData, setformData] = useState({
    adminId: "",
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

    dispatch(checkAdmin({ formData, Options, navigate }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformData({ ...formData, [name]: value });
  };

  return (
    <>
      <FormComponent 
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        title={"Log in as a Admin"}
        fieldLabel={"Admin Id"}
        fieldName={"adminId"}
      />
    </>
  );
};

export default Form;
