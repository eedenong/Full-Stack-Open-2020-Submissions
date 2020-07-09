const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SHOW':
      return action.notification
    case 'HIDE':
      return ''
    default:
      return state
  }
}

export const setNotification = (notification, timeout) => {
  return async dispatch => {
    dispatch(displayNotification(notification))
      .then(() => {
        const timeoutInMs = timeout * 1000
        setTimeout(() => dispatch(hideNotification()), timeoutInMs)
      })
  }
}

const displayNotification = notification => {
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      notification
    })
  }
}

const hideNotification = () => {
  return async dispatch => {
    dispatch({
      type: 'HIDE'
    })
  }
}

export default notificationReducer