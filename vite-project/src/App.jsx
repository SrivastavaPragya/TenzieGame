import React, { useState } from 'react';
import '../src/App.css';
import Die from './components/Die';
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
/**
 * Challenge: Tie off loose ends!
 * 1. If tenzies is true, Change the button text to "New Game"
 * 2. If tenzies is true, use the "react-confetti" package to
 *    render the <Confetti /> component 🎉
 * 
 *    Hint: don't worry about the `height` and `width` props
 *    it mentions in the documentation.
 */

const App = () => {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies,setTenzies]=React.useState(false)

  React.useEffect(()=>{
    // Check if all dice are held
    const allHeld = dice.every(die => die.isHeld);
    // Check if all dice have the same value
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!");
    }
  },[dice])


  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
      value:  (Math.floor(Math.random() * 6) + 1),
      isHeld:false,
      id: nanoid()

      })
     
    }
    return newDice;
  }

    function holdDice(id) {
      setDice(oldDice => oldDice.map(die => {
        if (die.id === id) {
          return {...die, isHeld: !die.isHeld};
        }
        return die;
      }));
    }
    

  

    function rollDice() {
      setDice(oldDice => oldDice.map(die => {
        if (die.isHeld) {
          // If the die is held, keep its current value
          return die;
        } else {
          // If the die is not held, roll a new value
          return {
            ...die,
            value: Math.floor(Math.random() * 6) + 1
          };
        }
      }));
    }
    

  const diceElements = dice.map(die => <Die key={die.id}  value={die.value} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)}/>)
  

  return (
    <main>
       {tenzies && <Confetti />}
       <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container" >
      {diceElements}
        
      </div>
      <button className="dingdong" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll Dice"}
      </button>
    </main>
  );
}

export default App;


