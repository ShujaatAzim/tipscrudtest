import React from 'react'

class Tip extends React.Component {

  render() {

    const tip = this.props.tipObj

    return (
      <li id={tip.id}><b>{tip.amount}</b> on {tip.date}{"   "}
        <button onClick={this.props.handleTipEdit}>Edit</button>
        <button onClick={this.props.handleTipDelete}>Delete</button>
      </li>
    )
  }
}

export default Tip