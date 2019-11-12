import React from 'react'

class EditTip extends React.Component {

  state = {
    newTipAmount: "",
    newTipDate: "",
    newTipLocation: ""
  }

  componentDidMount() {
    this.setState({
      newTipAmount: this.props.clickedTip.amount,
      newTipDate: this.props.clickedTip.date,
      newTipLocation: this.props.clickedTip.restaurant.id
    })
  }

  changeTip = (event) => {
    const name = event.target.name
    const value = event.target.value
    this.setState({
      [name]: value
    })
  }

  finalizeNewTip = (event) => {
    event.preventDefault()
    fetch(`http://localhost:3000/tips/${this.props.clickedTip.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        amount: this.state.newTipAmount,
        date: this.state.newTipDate,
        restaurant_id: this.state.newTipLocation
      })
    })
    .then(resp => resp.json())
    .then(this.props.updateAllTips())
    .then(this.setState({
      newTipAmount: "",
      newTipDate: "",
      newTipLocation: ""
    }))
    .then(this.props.cancelEdit())
  }

  render() {
    return (
      <div>
        <h3>Editing the {this.props.clickedTip.amount} Tip<button onClick={this.props.cancelEdit}>Cancel</button></h3>
        <form onSubmit={this.finalizeNewTip}>
          <label>Change Amount</label>
          <input type="text" value={this.state.newTipAmount} name="newTipAmount" onChange={this.changeTip} />
          <label>Change Date</label>
          <input type="text" value={this.state.newTipDate} name="newTipDate" onChange={this.changeTip} />
          <label>Change Restaurant ID</label>
          <input type="text" value={this.state.newTipLocation} name="newTipLocation" onChange={this.changeTip} />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default EditTip