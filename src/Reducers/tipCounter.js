const tipCounterReducer = (state = 0, action) => {

  switch(action.type) {
    case "INCREMENT_TIP":
      return state + 1;
    case "DECREMENT_TIP":
      return state - 1;
    default: 
      return state;
  }

}

export default tipCounterReducer