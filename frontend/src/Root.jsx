import { Outlet, useNavigate } from "react-router-dom"
import Header from "./components/Header"
import { useEffect } from "react"

const Root = ({token}) => {
  const navigate = useNavigate()

  useEffect(() => {
    if(!token) {
      navigate('/login')
    }
  }, [token])

  return (
    <section className='flex-col max-w-6xl'>
      <Header />
      <div className='bg-gray-100 mb-8 p-4 rounded-lg max-w-4xl' >
        <div className='flex align-middle gap-2 items-center mb-4'>
          <h1 className="font-bold"></h1>
        </div>
      <Outlet />
      </div>
    </section>
  )
}
export default Root