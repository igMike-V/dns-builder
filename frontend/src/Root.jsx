import { Outlet, useNavigate, useLocation } from "react-router-dom"
import Header from "./components/Header"
import { useEffect } from "react"
import { useAuth } from "./components/shared/AuthContext"
import ConfirmModal from "./components/shared/ConfirmModal"

const Root = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isLoggedIn, loading } = useAuth()

  useEffect(() => {
    if (loading) return
    if(!isLoggedIn) {
      if(location.pathname.substring(0, 6) === '/site/') return
      navigate('/login')
    }
  }, [isLoggedIn, loading])

  return (
    <section className='flex flex-col '>
      <ConfirmModal />
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