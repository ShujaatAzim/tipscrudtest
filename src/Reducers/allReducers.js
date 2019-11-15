import restaurantCounter from './restaurantCounter'
import tipCounter from './tipCounter'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
  restaurantCounter,
  tipCounter
})

export default allReducers

