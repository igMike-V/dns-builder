import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const LoginForm = ({token}) => {
  const navigate = useNavigate()

  useEffect(() => {
    if(token) {
      navigate('/')
    }
  }, [token])

  
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  })

  return (
    <div className='bg-gray-100 mb-8 p-4 rounded-lg max-w-4xl' >
      <div className='flex align-middle gap-2 items-center mb-4'>
        <h1 className="font-bold">Login.</h1>
      </div>
      <form className='w-full pt-7'>
        <div className="md:items-center mb-6">
          <div className="">
            <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" >
              Email Address
            </label>
          </div>
          <div className="" >
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                type="text" name="email" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>
        </div>
        <div className="md:items-center mb-6">
          <div className="">
            <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" >
              Password
            </label>
          </div>
          <div className="" >
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                type="password" name="password" value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value}) }
            />
          </div>
        </div>
        <div className='flex gap-2'>
          <button className="shadow bg-teal-600 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" >Login</button>
        </div>
        
      </form>
    </div>
  )
}
