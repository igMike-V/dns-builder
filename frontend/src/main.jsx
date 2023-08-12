import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider} from 'react-router-dom'

import {AuthContextProvider} from './components/shared/AuthContext'
import { ConfirmContextProvider } from './components/shared/ConfirmContext'

import './index.css'
import Root from './Root'
import { LoginForm } from './components/LoginForm'
import { ErrorPage } from './components/ErrorPage'
import Sites from './components/Sites'
import Templates from './components/Templates'
import Records from './components/Records'




const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'sites',
        element: <Sites/>,
      },
      {
        path: 'templates',
        element: <Templates/>,
      },
      {
        path: 'records',
        element: <Records/>,
      },  
      {
        path: 'login',
        element: <LoginForm />,
      },
    ]
    
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthContextProvider>
        <ConfirmContextProvider>
          <RouterProvider router={router} />
        </ConfirmContextProvider>
      </AuthContextProvider>
  </React.StrictMode>,
)
