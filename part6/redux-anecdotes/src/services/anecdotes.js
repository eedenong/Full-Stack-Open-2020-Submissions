import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteAnecdote = async (id) => {
  const url = baseUrl + `/${id}`
  const getResponse = await axios.get(url)
  const prevAnecdote = getResponse.data
  const votes = prevAnecdote.votes
  const response = await axios.put(url, { ...prevAnecdote, votes: votes + 1 })
  return response.data
}

export default { getAll, createNew, voteAnecdote }