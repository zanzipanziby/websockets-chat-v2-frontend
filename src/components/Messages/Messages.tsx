import s from './Messages.module.css'
import { MessagesResponse } from '../../types/types.ts'


export const Messages = ({ messages, user }: Props) => {
  console.log(messages)
  if (user && messages.length !== 0) {
    debugger
    return (
      <div className={s.messages}>
        {messages.map(({ username, message }, i) => {
          debugger
          const itsMe = username === user
          const className = itsMe ? s.me : s.user
          return (
            <div className={`${s.message} ${className}`} key={i}>
              <span className={s.user}>{username}</span>
              <div className={s.text}>{message}</div>
            </div>
          )
        })}
      </div>
    )
  }
  return null
}

type Props = {
  messages: MessagesResponse[]
  user: string | null
}
