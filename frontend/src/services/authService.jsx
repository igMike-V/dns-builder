import axios from './axios'
import { API_URL } from '../utilities/settings'

const baseUrl = `${API_URL}/api`

const login = async ({ email, password }) => {
  try {
    const req = await axios.post(
      `${baseUrl}/login`,
      { email, password },
      { withCredentials: true }
    )
    return req.data
  } catch (err) {
    console.log({ error: err.response.data.error })
  }
}

const getAuth = async () => {
  try {
    const authorization = await axios.get(`${baseUrl}/login`, {
      withCredentials: true
    })
    return authorization.data
  } catch (err) {
    console.error(err)
  }
}

const logout = async () => {
  try {
    const req = await axios.post(`${baseUrl}/logout`, { withCredentials: true })
    console.log('logout request', req.data)
  } catch (err) {
    console.error(err.response.data.message)
  }
}

export default { login, logout, getAuth }
