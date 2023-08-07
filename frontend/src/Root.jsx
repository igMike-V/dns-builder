import { Outlet, useNavigate } from "react-router-dom"
import Header from "./components/Header"
import { useEffect } from "react"
import { useAuth } from "./components/shared/AuthContext"

const Root = () => {
  const navigate = useNavigate()
  const { isLoggedIn, loading } = useAuth()

  useEffect(() => {
    if(loading) {
      return
    } else {
      if(!isLoggedIn) {
        navigate('/login')
      }
    }
  }, [isLoggedIn, loading])

  return (
    <section className='flex flex-col '>
      <Header />
      <div className='bg-gray-100 mb-8 p-4 rounded-lg' >
        <div className='flex align-middle gap-2 items-center mb-4'>
          <h1 className="font-bold"></h1>
        </div>
      <Outlet />
      </div>
    </section>
  )
}
export default Root