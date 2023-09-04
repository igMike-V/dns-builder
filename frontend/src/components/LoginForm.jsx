import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/authService'
import { useAuth } from './shared/AuthContext'

export const LoginForm = () => {
  const navigate = useNavigate()
  const auth = useAuth()

  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const login = await authService.login(inputs)
      if(login) {
        auth.setUser(login.name)
        auth.setIsLoggedIn(true)
        auth.setLoading(false)
        navigate('/sites')
      }
    } catch (error) {
    }
    
  }


  return (
    <div className='p-4 mb-8 bg-gray-100 rounded-lg' >
      <div className='flex items-center gap-2 mb-4 align-middle'>
        <h1 className="font-bold">Login.</h1>
      </div>
      <form className='w-full pt-7'>
        <div className="mb-6 md:items-center">
          <div className="">
            <label className="block pr-4 mb-1 font-bold text-gray-500 md:mb-0" >
              Email Address
            </label>
          </div>
          <div className="" >
            <input
              className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-teal-500"
                type="text" name="email" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>
        </div>
        <div className="mb-6 md:items-center">
          <div className="">
            <label className="block pr-4 mb-1 font-bold text-gray-500 md:mb-0" >
              Password
            </label>
          </div>
          <div className="" >
            <input
              className="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-teal-500"
                type="password" name="password" value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value}) }
            />
          </div>
        </div>
        <div className='flex gap-2'>
          <button className="px-4 py-2 font-bold text-white bg-teal-600 rounded shadow hover:bg-teal-400 focus:shadow-outline focus:outline-none" onClick={(e) => handleSubmit(e)} >Login</button>
        </div>
        
      </form>
    </div>
  )
}
