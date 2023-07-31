import axios from 'axios'

const baseUrl = 'http://localhost:3000/api'

const login = async ({email, password}) => {
  try {
    const req = await axios.post(`${baseUrl}/login`, {email, password})
    const user = req.data
    console.log(user)
  } catch (err) {
    console.log(err)
  }
}

const logout = async () => {
  const req = await axios.post(`${baseUrl}/logout`)
  return req.data
}

export default { login }