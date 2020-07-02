import deepFreeze from 'deep-freeze'
import counterReducer from './counterReducer'
import { createStore } from 'redux'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  let store
  beforeEach(() => {
    store = createStore(counterReducer, initialState)
  })
 
  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }
    store.dispatch(action)
    const newState = store.getState()
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    store.dispatch(action)
    const newState = store.getState()
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    store.dispatch(action)
    const newState = store.getState()
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    store.dispatch(action)
    const newState = store.getState()
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('zero resets all values to zero', () => {
    const action = {
      type: 'ZERO'
    }

    const state = {
      good: 5,
      ok: 3,
      bad: 1
    }

    store = createStore(counterReducer, state)

    deepFreeze(state)
    store.dispatch(action)
    const newState = store.getState()
    expect(newState).toEqual(initialState)
  })
})