import { createBrowserRouter } from 'react-router-dom'
import { Chat } from '../pages/Chat.tsx'
import { Join } from '../pages/Join.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Join />,
  },
  {
    path: '/chat',
    element: <Chat />,
  },
])
