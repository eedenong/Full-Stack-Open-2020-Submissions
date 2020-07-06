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

export const displayNotification = notification => {
  return {
    type: 'SHOW',
    notification
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE',
  }
}

export default notificationReducer