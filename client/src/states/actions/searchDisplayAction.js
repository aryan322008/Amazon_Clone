const setSearchDisplay = (value) => (dispatch) => {

    dispatch({type:"SEARCH_DISPLAY", payload:value})

};

export { setSearchDisplay };
