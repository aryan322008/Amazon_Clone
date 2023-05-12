import * as api from "../../api/index";

const fetchDetails = (id) => async (dispatch) => {
  try {
    const response  = await api
      .fetchDetails(id)
      .then(({ data }) => {
        dispatch({type:"FETCH_DETAILS", payload:data})
      })
      .catch(({ response }) => {
        if (response.data.errors) {
          console.log("object not found");
        }
      });
  } catch (error) {
    console.log(error);
  }
};

export { fetchDetails };
