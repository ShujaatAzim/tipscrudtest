const restaurantCounterReducer = (state = 0, action) => {

  switch(action.type) {
    case "INCREMENT_RESTAURANT":
      return state + 1;
    case "DECREMENT_RESTAURANT":
      return state - 1;
    default:
      return state;
      
  }

}

export default restaurantCounterReducer