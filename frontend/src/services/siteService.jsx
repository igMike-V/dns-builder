import axios from './axios'
import { API_URL } from '../utilities/settings'

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

const updateSite = async (id, site) => {
  try {
    const req = await axios.put(`${baseUrl}/sites/${id}`, site)
    return req.data
  } catch (err) {
    console.error(err.response.data.error)
  }
}


const deleteSite = async (id) => {
  try {
    const req = await axios.delete(`${baseUrl}/sites/${id}`)
    return req.data
  } catch (err) {
    console.error(err.response.data.error)
  }
}

export default { getSites, addSite, updateSite, deleteSite }