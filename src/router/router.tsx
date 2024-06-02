import { createBrowserRouter } from 'react-router-dom'
import { Chat } from '../pages/Chat/Chat.tsx'
import { Join } from '../pages/Join/Join.tsx'

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
