import axios from 'axios'
import { API_URL } from '../utilities/settings'

const baseUrl = `${API_URL}/api`

const axiosAuth = axios.create({
  baseURL: baseUrl,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': API_URL,
    'Access-Control-Allow-Credentials': true
  }
})

export default axiosAuth