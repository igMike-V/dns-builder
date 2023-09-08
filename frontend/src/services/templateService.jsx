import axios from './axios'
import { API_URL } from '../utilities/settings'

const baseUrl = `${API_URL}/api`

const getTemplates = async () => {
  try {
    const req = await axios.get(`${baseUrl}/templates`)
    return req.data
  } catch (err) {
    console.error(err.response.data.error)
  }
}

const addTemplate = async (template) => {
  try {
    const req = await axios.post(`${baseUrl}/templates`, template)
    return req.data
  } catch (err) {
    console.error(err.response.data.error)
  }
}

const updateTemplate = async (id, template) => {
  try {
    const req = await axios.put(`${baseUrl}/templates/${id}`, template)
    return req.data
  } catch (err) {
    console.error(err.response.data.error)
  }
}

const deleteTemplate = async (id) => {
  try {
    const req = await axios.delete(`${baseUrl}/templates/${id}`)
    return req.data
  } catch (err) {
    console.error(err.response.data.error)
  }
}

export default { getTemplates, addTemplate, updateTemplate, deleteTemplate }
