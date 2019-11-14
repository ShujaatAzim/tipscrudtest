import React from 'react';
import Restaurant from './Components/Restaurant';
import Tip from './Components/Tip';
import EditRestaurant from './Components/EditRestaurant';
import EditTip from './Components/EditTip';

class App extends React.Component {

  state = {
    tips: [],
    restaurants: [],
    restaurantName: "",
    restaurantLocation: "",
    tipAmount: "",
    tipDate: "",
    tipLocation: "",
    editing: false,
    editRestaurant: false,
    editTip: false,
    clickedRestaurant: null,
    clickedTip: null
  }

  componentDidMount() {
    fetch('http://localhost:3000/tips')
    .then(resp => resp.json())
    .then(data => this.setState({
      tips: data
    }))

    fetch('http://localhost:3000/restaurants')
    .then(resp => resp.json())
    .then(data => this.setState({
      restaurants: data
    }))
  }

  getRestaurants = () => {
    fetch('http://localhost:3000/restaurants')
    .then(resp => resp.json())
    .then(restaurants => this.setState({restaurants}))
  }
  
  getTips = () => {
    fetch('http://localhost:3000/tips')
    .then(resp => resp.json())
    .then(tips => this.setState({tips}))
  }

  handleNewRestaurant = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/restaurants', {
      method:"POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.restaurantName,
        location: this.state.restaurantLocation
      })
    })
    .then(this.getRestaurants)
    .then(this.setState({
      restaurantName: "",
      restaurantLocation: ""
    }))
  }

  handleNewTip = (event) => {
    event.preventDefault()
    let restaurantID = this.state.restaurants.find(restaurant => restaurant.name === this.state.tipLocation)
    fetch('http://localhost:3000/tips', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: this.state.tipAmount,
        date: this.state.tipDate,
        restaurant_id: restaurantID.id
      })
    })
    .then(this.setState({
      tipAmount: "",
      tipDate: "",
      tipLocation: ""
    }))
    .then(this.getTips)
  }

  handleRestaurantDelete = (event) => {
    const deletedRestaurant = event.currentTarget.parentNode.id
    fetch(`http://localhost:3000/restaurants/${deletedRestaurant}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(deletedRestaurant)
    })
    .then(this.getRestaurants)
  }

  handleTipDelete = (event) => {
    const deletedTip = event.currentTarget.parentNode.id
    fetch(`http://localhost:3000/tips/${deletedTip}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(deletedTip)
    })
    .then(this.getTips)
  }

  changeForm = (event) => {
    const name = event.target.name
    const value = event.target.value
    this.setState({
      [name]: value
    })
  }

  handleRestaurantEdit = () => {
    this.setState({
      editing: true,
      editRestaurant: this.state.editRestaurant ? false : true
    })
  }

  handleTipEdit = () => {
    this.setState({
      editing: true,
      editTip: this.state.editTip ? false : true
    })
  }

  clickedRestaurant = (restaurant) => {
    this.setState({
      clickedRestaurant: restaurant
    })
  }

  clickedTip = (tip) => {
    this.setState({
      clickedTip: tip
    })
  }

  cancelEdit = () => {
    this.setState({
      editing: false,
      editRestaurant: false,
      editTip: false
    })
  }

  updateAllTips = () => {
    this.getTips()
  }

  updateAllRestaurants = () => {
    this.getRestaurants()
  }

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleNewRestaurant}>
            <h2>Add new restaurant!</h2>
            Name: <input type="text" name="restaurantName" value={this.state.restaurantName} onChange={this.changeForm}/>
            <br />
            Location: <input type="text" name="restaurantLocation" value={this.state.restaurantLocation} onChange={this.changeForm}/>
            <br />
            <input type="submit" />
          </form>
        </div>
        <br />
        <div>
          <form onSubmit={this.handleNewTip}>
            <h2>Add a new tip!</h2>
            Amount: 
              <input type="text" value={this.state.tipAmount} name="tipAmount" onChange={this.changeForm} />
            <br />
            Date: 
              <input type="text" value={this.state.tipDate} name="tipDate" onChange={this.changeForm} />
            <br />
            Restaurant: 
              <select value={this.state.tipLocation} name="tipLocation" onChange={this.changeForm}>
                <option value="" disabled>Select a Restaurant</option>
                {this.state.restaurants.map(restaurant => <option key={restaurant.id}>{restaurant.name}</option>)}
              </select>
            <br />
            <input type="submit" />
          </form>
        </div>
        <div>
          <h3>Tips:</h3>
            <ol>
              {this.state.tips.map(tip => 
              <Tip key={tip.id} tipObj={tip} handleTipEdit={this.handleTipEdit} 
                handleTipDelete={this.handleTipDelete} editing={this.state.editing} clickedTip={this.clickedTip}/> )}
            </ol>
          <h3>Restaurants:</h3>
          <ol>
            {this.state.restaurants.map(restaurant => 
              <Restaurant key={restaurant.id} restaurantObj={restaurant} handleRestaurantEdit={this.handleRestaurantEdit} 
                handleRestaurantDelete={this.handleRestaurantDelete} editing={this.state.editing} clickedRestaurant={this.clickedRestaurant}/> )}
          </ol>
        </div>
        
        { this.state.editRestaurant && !this.state.editTip ? 
          <EditRestaurant updateAllRestaurants={this.updateAllRestaurants} clickedRestaurant={this.state.clickedRestaurant} 
          cancelEdit={this.cancelEdit} /> : null }

        { this.state.editTip && !this.state.editRestaurant ? 
          <EditTip updateAllTips={this.updateAllTips} clickedTip={this.state.clickedTip} cancelEdit={this.cancelEdit} 
          allRestaurants={this.state.restaurants}/> : null }

      </div>
    )
  }
}

export default App;
