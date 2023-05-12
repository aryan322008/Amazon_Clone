export default (state = [{}], action) => {
  switch (action.type) {
    case "ADD_ORDER":
      return action.payload;

    case "FETCH_ORDER_HISTORY":
      return action.payload;

    default:
      return state;
  }
};
