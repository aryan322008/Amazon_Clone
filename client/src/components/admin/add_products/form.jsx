import React, { useEffect, useState } from "react";
import { addItem } from "../../../states/actions/cartAction";
import { useDispatch } from "react-redux";
import FileBase64 from "react-file-base64";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


const Form = () => {
  const [formData, setformData] = useState({
    image: "",
    title: "",
    description: "",
    price: 0,
    ageRating: 0,
    colors: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Options = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    const admin_verified = localStorage.getItem("admin_verified");

    if (!user) {
       navigate("/auth");
    }else if (!admin_verified) {
      navigate("/admin/login");
    }

  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

      dispatch(addItem({formData, Options}));

      setTimeout(() => {
        setformData({
          image: "",
          title: "",
          description: "",
          price: 0,
          ageRating: 0,
          colors: "",
        });
      }, 100);
  };

  return (
    <div className="productsForm container">
      <form onSubmit={handleSubmit}>
        <div className="form-group my-4">
          <label htmlFor="inputAddress">Title</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="Enter Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-row d-flex">
          <div className="form-group col-md-2 mx-2">
            <label htmlFor="inputZip">Price</label>
            <input
              type="number"
              className="form-control"
              id="inputZip"
              placeholder="0"
              value={formData.price}
              name="price"
              onChange={handleChange}
            />
          </div>

          <div className="form-group col-md-2">
            <label htmlFor="inputZip2">Age Rating</label>
            <input
              type="number"
              className="form-control"
              id="inputZip2"
              value={formData.ageRating}
              placeholder="0"
              name="ageRating"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group my-4">
          <label htmlFor="inputColors">Colors</label>
          <input
            type="text"
            className="form-control"
            id="inputColors"
            placeholder="Enter color with Spacing"
            name="colors"
            value={formData.colors}
            onChange={handleChange}
          />
        </div>

        <div className="form-floating my-4">
          <textarea
            className="form-control"
            placeholder="Description"
            id="floatingTextarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          <label htmlFor="floatingTextarea">Description</label>
        </div>

        <div className="my-4">
          <FileBase64
            multiple={false}
            onDone={(value) =>
              setformData({ ...formData, image: value.base64 })
            }
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
      <ToastContainer
          position="top-center"
          autoClose={2000}
          limit={5}
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
