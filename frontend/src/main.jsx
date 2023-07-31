import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { createBrowserRouter, RouterProvider} from 'react-router-dom'

import './index.css'
import Root from './Root'
import { LoginForm } from './components/LoginForm'
import { ErrorPage } from './components/ErrorPage'

const token = true;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root token={token} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/login/',
        element: <LoginForm token={token}/>,
      },

    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <section className='flex-col max-w-6xl'>
      <RouterProvider router={router} />
    </section>
  </React.StrictMode>,
)
