import { ArrowUp } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { createMessageReaction } from '../http/create-message-reaction'
import { toast } from 'sonner'
import { removeMessageReaction } from '../http/remove-message-reaction'

interface MessageProps {
  id: string
  text: string
  amountOfReactions: number
  answered?: boolean
}

export function Message({
  id: messageId,
  text,
  amountOfReactions,
  answered = false,
}: MessageProps) {
  const { roomId } = useParams()

  const [hasReacted, sethasReacted] = useState(false)

  if (!roomId)
    throw new Error(
      'Componente de mensagem deve ser usado no componente da sala',
    )

  async function createMessageReactionAction() {
    if (!roomId) return

    try {
      await createMessageReaction({ roomId, messageId })
      sethasReacted(true)
    } catch {
      toast.error('Falha ao curtir a pergunta. Tente novamente.')
    }
  }

  async function removeMessageReactionAction() {
    if (!roomId) return

    try {
      await removeMessageReaction({ roomId, messageId })
      sethasReacted(false)
    } catch {
      toast.error('Falha ao remover curtida da pergunta.')
    }
  }

  return (
    <li
      data-answered={answered}
      className="ml-6 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none"
    >
      {text}
      {hasReacted ? (
        <button
          onClick={removeMessageReactionAction}
          type="button"
          className="mt-3 flex items-center gap-2 text-orange-400 text-sm font-md hover:text-orange-500"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      ) : (
        <button
          onClick={createMessageReactionAction}
          type="button"
          className="mt-3 flex items-center gap-2 text-zinc-400 text-sm font-md hover:text-zinc-300"
        >
          <ArrowUp className="size-4" />
          Curtir pergunta ({amountOfReactions})
        </button>
      )}
    </li>
  )
}
