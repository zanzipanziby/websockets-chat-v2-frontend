import s from './Join.module.css'
import { useNavigate } from 'react-router-dom'
import { ChangeEvent, MouseEvent, useState } from 'react'
import { JoinValues } from '../../types/types.ts'

export const Join = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState<JoinValues>({ username: '', room: '' })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const isDisabled = Object.values(values).some((val) => val === '')
    if (!isDisabled) {
      navigate(`/chat?name=${values.username}&room=${values.room}`)
    } else {
      e.preventDefault()
    }
    return
  }

  return (
    <div className={s.wrap}>
      <div className={s.container}>
        <h1 className={s.heading}>Join</h1>
        <form className={s.form}>
          <div className={s.group}>
            <input
              type="text"
              name={'username'}
              className={s.input}
              value={values.username}
              placeholder={'Username'}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className={s.group}>
            <input
              type="text"
              name={'room'}
              className={s.input}
              value={values.room}
              placeholder={'Room'}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className={s.group}>
            <button type={'submit'} className={s.button} onClick={handleClick}>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
