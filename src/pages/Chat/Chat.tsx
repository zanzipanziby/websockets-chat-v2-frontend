import s from './Chat.module.css'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useSearchParams } from 'react-router-dom'
import { JoinValues, MessagesResponse } from '../../types/types.ts'

export const Chat = () => {
  const [searchParams] = useSearchParams()
  const [state, setState] = useState<MessagesResponse[]>([])
  const [message, setMessage] = useState('')
  const params: JoinValues = {
    room: searchParams.get('room'),
    username: searchParams.get('username'),
  }
  useEffect(() => {
    const socket = io('http://localhost:3000')
    console.log(searchParams.get('username'))
    socket.emit('join', params)
    socket.on('message', ({ data }: { data: MessagesResponse }) => {
      console.log(data)
      setState((state) => [...state, data])
    })
  }, [])

  return (
    <>
      <div className={s.wrap}>
        <div className={s.header}>
          <div className={s.title}>{params.room}</div>
          <div className={s.users}>0 users is this room</div>
          <button className={s.left} onClick={() => {}}>
            left the room
          </button>
        </div>
        <div className={s.messages}>
          {state.map(({ message }) => (
            <span>{message}</span>
          ))}
        </div>
        <form className={s.form}>
          <input
            type="text"
            name={'message'}
            value={message}
            className={s.input}
            placeholder={'What do you want to say?'}
            onChange={() => {}}
            autoComplete="off"
            required
          />
        </form>
      </div>
    </>
  )
}
