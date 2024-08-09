import { useParams } from 'react-router-dom'
import { Message } from './message'
import { getRoomMessages } from '../http/get-room-messages'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export function Messages() {
  const { roomId } = useParams()

  if (!roomId) {
    throw new Error(
      'Componente de mensagens deve ser usado no componente da sala',
    )
  }

  const { data } = useSuspenseQuery({
    queryKey: ['messages', roomId],
    queryFn: () => getRoomMessages({ roomId }),
  })

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/subscribe/${roomId}`)

    ws.onopen = () => {
      console.log('Conectado ao websocket')
    }

    return () => {
      ws.close()
    }
  }, [roomId])

  return (
    <ol className="list-decimal list-outside px-3 space-y-8">
      {data.messages.map((message) => {
        return (
          <Message
            id={message.id}
            key={message.id}
            text={message.text}
            amountOfReactions={message.amountOfReactions}
            answered={message.answered}
          />
        )
      })}
    </ol>
  )
}
