import anecdoteService from '../services/anecdotes'

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.voteAnecdote(id)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE_ANECDOTES',
      data: anecdotes
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'INITIALIZE_ANECDOTES':
      return action.data
    
    case 'VOTE':{
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const prevVotes = anecdoteToChange.votes
      const changeAnecdote = {
        ...anecdoteToChange,
        votes: prevVotes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changeAnecdote
      )
    }

    default:
      return state
  }
}

export default anecdoteReducer