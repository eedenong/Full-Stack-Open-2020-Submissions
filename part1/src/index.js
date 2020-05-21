import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return (
      <div>
        please click a button
      </div>
    )
  } 

  return (
    <div>
      button press history: {allClicks.join(' ')}
    </div>
  )
}

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [leftCount, setLeft] = useState(0)
  const [rightCount, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(leftCount + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(rightCount + 1)
  }


  const [value, setValue] = useState(10)

  const setToValue = (value) => {
    setValue(value)
  }
  
  return (
    <div>
      <div>
        {leftCount}
        <Button onClick={handleLeftClick} text='left'/>
        <Button onClick={handleRightClick} text='right'/>
        {rightCount}
        <History allClicks={allClicks}/>
      </div>
      <div>
        <p>value: {value} </p>
        <Button onClick={() => setToValue(10)} text='ten'/>
        <Button onClick={() => setToValue(1000)} text='thousand' />
      </div>
    </div>
  )
} 

ReactDOM.render(<App />, document.getElementById('root'))