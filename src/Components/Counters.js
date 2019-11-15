import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementRestaurant, decrementRestaurant, incrementTip, decrementTip } from '../Actions/allActions'

const Counters = () => {
  const tipCounter = useSelector(state => state.tipCounter)
  const restaurantCounter = useSelector(state => state.restaurantCounter)
  const dispatch = useDispatch()
  
  return (
    <div>
      <h5>You have saved {tipCounter} Tips and {restaurantCounter} Restaurants.</h5>
      <button onClick={() => dispatch(incrementTip())}>+Tip</button><button onClick={() => dispatch(decrementTip())}>-Tip</button>
      <button onClick={() => dispatch(incrementRestaurant())}>+Restaurant</button><button onClick={() => dispatch(decrementRestaurant())}>-Restaurant</button>
    </div>
  )

}

export default Counters