import authService from '../../services/authService'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
  const navigate = useNavigate()
  const auth = useAuth()

  const handleLogout = async (e) => {
    e.preventDefault()
    await authService.logout()
    auth.setIsLoggedIn(false)
    auth.setUser(false)
    navigate('/login')
  }

  return (
    <button
      className="px-4 py-2 text-xs font-bold text-white bg-teal-600 rounded shadow hover:bg-teal-400 focus:shadow-outline focus:outline-none sm:font-normal"
      onClick={(e) => handleLogout(e)}
    >
      Logout
    </button>
  )
}

export default LogoutButton
