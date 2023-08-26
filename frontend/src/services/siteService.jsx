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

const addRecord = async (siteId, recordId) => {
  try {
    const req = await axios.post(`${baseUrl}/site-records/`, { siteId, recordId })
    return req.data
  } catch (err) {
    if(err.response.data.error) console.error(err.response.data.error)
    else
    console.error(err)
  }
}

const removeRecord = async (siteRecordId) => {
  try {
    await axios.delete(`${baseUrl}/site-records/${siteRecordId}`)
    return true
  } catch (err) {
    console.error(err)
  }
}

export default { getSites, addSite, updateSite, deleteSite, addRecord, removeRecord }