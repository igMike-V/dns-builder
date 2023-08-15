import axios from "./axios";
import { API_URL } from "../utilities/settings"

const baseUrl = `${API_URL}/api`

const get = async () => {
  try {
    const req = await axios.get(`${baseUrl}/records`)
    return req.data
  } catch (err) {
    console.error(err.response.data.error)
  }
}

const add = async (record) => {
  try {
    const req = await axios.post(`${baseUrl}/records`, record)
    return req.data
  } catch (err) {
    console.error(err.response.data.error)
  }
}

const update = async (id, record) => {
  try {
    const req = await axios.put(`${baseUrl}/records/${id}`, record)
    return req.data
  } catch (err) {
    console.error(err.response.data.error)
  } 
}

const remove = async (id) => {
  try {
    const req = await axios.delete(`${baseUrl}/records/${id}`)
    return req.data
  } catch (err) {
    console.error(err.response.data.error)
  }
} 

export default { get, add, update, remove }