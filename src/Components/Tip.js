import React from 'react'

const Tip = props => {

  const tip = props.tipObj

  return (
    <li id={tip.id}><b>{tip.amount}</b> on <b>{tip.date}</b> at <b>{tip.restaurant.name}</b> in <b>{tip.restaurant.location}</b>{"   "}
      <button onClick={() => { props.handleTipEdit(); props.clickedTip(tip) }} disabled={props.editing}>Edit</button>
      <button onClick={props.handleTipDelete} disabled={props.editing}>Delete</button>
    </li>
  )
  
}

export default Tip