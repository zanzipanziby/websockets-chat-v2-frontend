import s from './Chat.module.css'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { JoinValues, MessagesResponse } from '../../types/types.ts'
import icon from '../../assets/smile.svg'
import EmojiPicker from 'emoji-picker-react'
import { Messages } from '../../components/Messages/Messages.tsx'

const socket = io('http://localhost:3000')

export const Chat = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [state, setState] = useState<MessagesResponse[]>([])
  const [message, setMessage] = useState('')
  const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState<boolean>(false)
  const params: JoinValues = {
    room: searchParams.get('room'),
    username: searchParams.get('username'),
  }
  useEffect(() => {
    if (socket) {
      console.log(searchParams.get('username'))
      socket.emit('join', params)
      socket.on('message', ({ data }: { data: MessagesResponse }) => {
        console.log(data)
        setState((state) => [...state, data])
      })

      return () => {
        socket.disconnect()
      }
    }
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }
  const onEmojiClick = () => setEmojiPickerIsOpen((isOpen) => !isOpen)
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!message) return
    socket.emit('sendMessage', { message, params })
    console.log({ message, params }, 'params')
    setMessage('')
  }

  const returnToMain = () => {
    navigate('/')
  }

  return (
    <>
      <div className={s.wrap}>
        <div className={s.header}>
          <div className={s.title}>{params.room}</div>
          <div className={s.users}>0 users is this room</div>
          <button className={s.left} onClick={returnToMain}>
            left the room
          </button>
        </div>
        <div className={s.messages}>
          <Messages messages={state} user={params.username} />
        </div>
        <form className={s.form} onSubmit={handleSubmit}>
          <div className={s.input}>
            <input
              type="text"
              name={'message'}
              value={message}
              placeholder={'What do you want to say?'}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className={s.emoji}>
            <img src={icon} alt="icon" onClick={onEmojiClick} />
            {emojiPickerIsOpen && (
              <div className={s.emojies}>
                <EmojiPicker
                  onEmojiClick={({ emoji }) => {
                    setMessage((message) => `${message} ${emoji}`)
                  }}
                />
              </div>
            )}
          </div>
          <div className={s.button}>
            <button type="submit" className={s.button}>
              Send message
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
