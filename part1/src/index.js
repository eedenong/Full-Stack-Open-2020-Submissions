import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const name = "Alice"
  const age = 10
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name={name} age={age}/>
      <Hello name="Bob" age={age + 10}/>
    </div>
  )
} 

ReactDOM.render(<App />, document.getElementById('root'))