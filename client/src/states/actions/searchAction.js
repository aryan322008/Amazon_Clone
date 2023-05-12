import * as api from "../../api/index";

const getSearchItems = ({searchText , page}) => async (dispatch) => {
  try {
    const { data } = await api.getSearchItems({searchText, page});

    dispatch({ type: "GET_SEARCH_ITEMS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

const fetchSearchItems = ({search, page}) => async (dispatch) => {
  try {
    const { data } = await api.fetchSearchItems({search, page});

    dispatch({ type: "FETCH_SEARCH_ITEMS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export { getSearchItems, fetchSearchItems };
