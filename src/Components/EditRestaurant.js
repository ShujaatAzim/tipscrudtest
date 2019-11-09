import React from 'react'

class EditRestaurant extends React.Component {

  state = {
    newRestaurantName: "",
    newRestaurantLocation: ""
  }

  componentDidMount() {
    this.setState({
      newRestaurantName: this.props.clickedRestaurant.name,
      newRestaurantLocation: this.props.clickedRestaurant.location,
    })
  }

  changeRestaurant = (event) => {
    const name = event.target.name
    const value = event.target.value
    this.setState({
      [name]: value
    })
  }

  finalizeNewRestaurant = (event) => {
    event.preventDefault()
    fetch(`http://localhost:3000/restaurants/${this.props.clickedRestaurant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        name: this.state.newRestaurantName,
        location: this.state.newRestaurantLocation,
      })
    })
    .then(resp => resp.json())
    .then(this.props.updateAllRestaurants())
    .then(this.setState({
      newRestaurantName: "",
      newRestaurantLocation: ""
    }))
    .then(this.props.cancelEdit())
  }


  render() {
    return (
      <div>
        <h1>Editing {this.props.clickedRestaurant.name}<button onClick={this.props.cancelEdit}>Cancel</button></h1>
        <form onSubmit={this.finalizeNewRestaurant}>
          <label>Change Name</label>
          <input type="text" name="newRestaurantName" value={this.state.newRestaurantName} onChange={this.changeRestaurant} />
          <label>Change Location</label>
          <input type="text" name="newRestaurantLocation" value={this.state.newRestaurantLocation} onChange={this.changeRestaurant} />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default EditRestaurant