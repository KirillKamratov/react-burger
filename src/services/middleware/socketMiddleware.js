import { getAccessToken } from '../../utils/auth'

export const socketMiddleware = (wsUrl, wsActions) => {
  const token = getAccessToken().split('Bearer ')[1]
  return store => {
    let socket = null
    return next => action => {
      const { dispatch } = store
      const { type, payload } = action
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =
        wsActions
      if (action.user && type === wsInit) {
        socket = new WebSocket(`${wsUrl}?token=${token}`)
      } else if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}/all`)
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event })
        }
        socket.onerror = event => {
          dispatch({ type: onError, payload: event })
        }

        socket.onmessage = event => {
          const { data } = event
          const parsedData = JSON.parse(data)
          const { success, ...restParsedData } = parsedData

          dispatch({ type: onMessage, payload: restParsedData })
        }

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event })
        }

        if (type === wsSendMessage) {
          const message = token ? { ...payload, token: token } : { ...payload }
          socket.send(JSON.stringify(message))
        }
      }

      next(action)
    }
  }
}
