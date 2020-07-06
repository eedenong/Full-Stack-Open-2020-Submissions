import React, { useEffect } from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import noteService from './services/notes'
import { useDispatch } from 'react-redux'
import { initializeNotes } from './reducers/noteReducer'


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    noteService
      .getAll()
      .then(notes => dispatch(initializeNotes(notes)))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return(
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App;
