import { Outlet, useNavigate } from "react-router-dom"
import Header from "./components/Header"
import { useEffect } from "react"
import { useAuth } from "./components/shared/AuthContext"

const Root = () => {
  const navigate = useNavigate()
  const { isLoggedIn, loading } = useAuth()
  console.log ('isLoggedIn', isLoggedIn)
  console.log ('loading', loading)

  useEffect(() => {
    if (loading) return
    if(!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn, loading])

  return (
    <section className='flex flex-col '>
      <Header />
      <div className='bg-gray-100 mb-8 p-4 rounded-lg' >
        <div className='flex flex-col gap-2 mb-4'>
        </div>
      <Outlet />
      </div>
    </section>
  )
}
export default Root