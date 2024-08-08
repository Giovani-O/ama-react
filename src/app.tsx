import { Toaster } from 'sonner'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CreateRoom } from './pages/create-room'
import { Room } from './pages/room'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateRoom />,
  },
  {
    path: '/room/:roomId',
    element: <Room />,
  },
  {
    path: '*',
    element: <h1>404 Page Not Found</h1>,
  },
])

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster invert richColors />
    </>
  )
}
