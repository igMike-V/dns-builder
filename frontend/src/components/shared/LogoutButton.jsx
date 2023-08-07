import authService from "../../services/authService"
import { useAuth } from "./AuthContext";
import {useNavigate} from "react-router-dom"

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
    <button className="shadow bg-teal-600 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" onClick={(e) => handleLogout(e)} >
      Logout {auth.user && auth.user}
    </button>
  )
}

export default LogoutButton;