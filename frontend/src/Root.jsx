import { Outlet, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import { useEffect } from 'react'
import { useAuth } from './components/shared/AuthContext'
import ConfirmModal from './components/shared/ConfirmModal'

const Root = () => {
  const navigate = useNavigate()
  const { isLoggedIn, loading } = useAuth()

  useEffect(() => {
    if (loading) return
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [isLoggedIn, loading])

  return (
    <section className="flex flex-col ">
      <ConfirmModal />
      <Header />
      <div className="mb-8 bg-gray-100 rounded-lg sm:p-4">
        <div className="flex flex-col gap-2 mb-4"></div>
        <Outlet />
      </div>
    </section>
  )
}
export default Root
