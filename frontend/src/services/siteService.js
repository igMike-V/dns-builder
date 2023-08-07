import axios from './axios'
import { API_URL } from '../utilities/setttings'

const baseUrl = `${API_URL}/api`

const getSites = async () => {
  try {
    const req = await axios.get(`${baseUrl}/sites`)
    return req.data
  } catch (err) {
    console.error(err.response.data.error)
  }
}

const addSite = async (site) => {
  try {
    const req = await axios.post(`${baseUrl}/sites`, site)
    return req.data
  } catch (err) {
    console.error(err.response.data.error)
  }
}

export default { getSites, addSite }