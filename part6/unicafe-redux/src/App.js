import React from 'react'
import ReactDOM from 'react-dom'
import counterReducer from './reducers/counterReducer'
import { createStore } from 'redux'

const store = createStore(counterReducer)

const goodAction = {
  type: 'GOOD'
}

const okAction = {
  type: 'OK'
}

const badAction = {
  type: 'BAD'
}

const zeroAction = {
  type: 'ZERO'
}
const App = () => {
  return (
    <div>
      <div>
        good: {store.getState().good}
      </div>
      <div>
        ok: {store.getState().ok}
      </div>
      <div>
        bad: {store.getState().bad}
      </div>
      <div>
        <button onClick={() => store.dispatch(goodAction)}>good</button>
        <button onClick={() => store.dispatch(okAction)}>ok</button>
        <button onClick={() => store.dispatch(badAction)}>bad</button>
        <button onClick={() => store.dispatch(zeroAction)}>reset</button>
      </div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
export default App