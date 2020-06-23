import React from 'react'

const Notification = ({ message, isErrorNotification }) => {
  if (message === null) {
    return null
  } else {
    if (isErrorNotification) {
      return (
        <div className="error">
          {message}
        </div>
      )
    } else {
      return (
        <div className="notification">
          {message}
        </div>
      )
    }
  }
}

export default Notification