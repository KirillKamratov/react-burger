import { Middleware } from 'redux'
import { TRootState } from '../store'
import { TWebSocketActions } from '../../utils/types'

export const socketMiddleware = (
  wsUrl: string,
  wsActions: TWebSocketActions,
): Middleware<{}, TRootState> => {
  return store => {
    let socket: WebSocket | null = null
    return next => action => {
      const { dispatch } = store
      const { type, payload } = action
      const { wsInit, wsClosing, onOpen, onClose, onError, onMessage } =
        wsActions
      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}${payload}`)
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event })
        }
        socket.onerror = event => {
          dispatch({ type: onError, payload: event })
        }
        socket.onmessage = (event: MessageEvent) => {
          const { data } = event
          dispatch({ type: onMessage, payload: JSON.parse(data) })
        }
        socket.onclose = (event: Event) => {
          dispatch({ type: onClose, payload: event })
        }
        if (type === wsClosing) {
          socket.close()
        }
      }
      next(action)
    }
  }
}
