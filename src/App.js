import React from 'react';
import './App.css';

class App extends React.Component {

  state = {
    tips: [],
    restaurants: []
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
  
handleNewRestaurant = (event) => {
  fetch('http://localhost:3000/restaurants', {
    method:"POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: event.target.name.value,
      location: event.target.location.value
    })
  })
}

handleNewTip = (event) => {
  fetch('http://localhost:3000/tips', {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: event.target.amount.value,
      date: event.target.date.value,
      restaurant_id: event.target.restaurant_id.value
    })
  })
}

handleRestaurantDelete = (event) => {
  fetch(`http://localhost:3000/restaurants/${event.currentTarget.parentNode.id}`, {
    method: "DELETE"
  })
}

handleTipDelete = (event) => {
  fetch(`http://localhost:3000/tips/${event.currentTarget.parentNode.id}`, {
    method: "DELETE"
  })
}

  render() {
    return (
      <div>
        <div>
          <form onSubmit={this.handleNewRestaurant}>
            Add new restaurant!
            <br />
            Name: <input type="text" name="name" />
            <br />
            Location: <input type="text" name="location" />
            <br />
            <input type="submit" />
          </form>
        </div>
        <br />
        <div>
          <form onSubmit={this.handleNewTip}>
            Add a new tip!
            <br />
            Amount: <input type="text" name="amount" />
            <br />
            Date: <input type="text" name="date" />
            <br />
            Restaurant ID: <input type="number" name="restaurant_id" />
            <br />
            <input type="submit" />
          </form>
        </div>
        <div>
          <h2>Tips:</h2>
            <ol>
              {this.state.tips.map(tip => <li key={tip.id} id={tip.id}><b>{tip.amount}</b> on {tip.date}{"   "}
                <button onClick={this.handleTipDelete}>X</button></li>)}
            </ol>
          <br />
          <h2>Restaurants:</h2>
          <ol>
            {this.state.restaurants.map(restaurant => <li key={restaurant.id }id={restaurant.id}><b>{restaurant.name}</b> --> {restaurant.location}{"   "}
              <button key={restaurant.id} onClick={this.handleRestaurantDelete}>X</button></li>)}
          </ol>
        </div>
      </div>
    )
  }
}

export default App;
