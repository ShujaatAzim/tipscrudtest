import React from 'react'

const Restaurant = props => {

  const restaurant = props.restaurantObj

  return (
    <li id={restaurant.id}><b>{restaurant.name}</b> --> {restaurant.location}{"   "}
      <button onClick={() => { props.handleRestaurantEdit(); props.clickedRestaurant(restaurant) }} 
        disabled={props.editing}>Edit</button>
      <button key={restaurant.id} onClick={props.handleRestaurantDelete} disabled={props.editing}>Delete</button>
    </li>
  )
  
}

export default Restaurant