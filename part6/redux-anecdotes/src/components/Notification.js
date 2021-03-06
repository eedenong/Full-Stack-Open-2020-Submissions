import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => {
    const notificationStateObject = state.notification
    return notificationStateObject.notification
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    display: notification === '' ? 'none' : ''
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification