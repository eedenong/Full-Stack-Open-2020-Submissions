export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INITIALIZE_ANECDOTES',
    data: anecdotes
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