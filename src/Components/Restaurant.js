import React from 'react'

class Restaurant extends React.Component {

  render() {

    const restaurant = this.props.restaurantObj

    return (
      <li id={restaurant.id}><b>{restaurant.name}</b> --> {restaurant.location}{"   "}
        <button onClick={this.props.handleRestaurantEdit}>Edit</button>
        <button key={restaurant.id} onClick={this.props.handleRestaurantDelete}>Delete</button>
      </li>
    )
  }
}

export default Restaurant