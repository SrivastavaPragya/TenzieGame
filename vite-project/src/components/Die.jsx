import React from 'react'

const Die = (props) => {

  const styles = {
    backgroundColor: props.isHeld ? "green" : "white"
}
  return (
    <div className="container" 
    onClick={props.holdDice}
    >
        <div className="Die" style={styles}>{props.value}</div>
        
    </div>
  )
}

export default Die
