const initialState = {
  notification: '',
  isShowing: false,
  timeout: null
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SHOW':
      return {
        notification: action.notification,
        isShowing: true,
        timeout: action.timeout
      }
    case 'HIDE':
      return initialState
    default:
      return state
  }
}

export const setNotification = (notification, timeout) => {
  return async (dispatch, getState) => {
    // check if there is a timeout present for a previous notification
    const timeoutId = getState().notification.timeout
    // if there is, clear the timeout
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    dispatch(displayNotification(notification, timeout))
  }
}

const displayNotification = (notification, timeout) => {
  const timeoutInMs = timeout * 1000
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      notification: notification,
      timeout: setTimeout(() => dispatch(hideNotification()), timeoutInMs)
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