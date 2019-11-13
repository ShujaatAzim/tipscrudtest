import React from 'react'

class Tip extends React.Component {

  render() {

    const tip = this.props.tipObj

    return (
      <li id={tip.id}><b>{tip.amount}</b> on <b>{tip.date}</b> at <b>{tip.restaurant.name}</b> in <b>{tip.restaurant.location}</b>{"   "}
        <button onClick={() => { this.props.handleTipEdit(); this.props.clickedTip(tip) }} disabled={this.props.editing}>Edit</button>
        <button onClick={this.props.handleTipDelete} disabled={this.props.editing}>Delete</button>
      </li>
    )
  }
}

export default Tip