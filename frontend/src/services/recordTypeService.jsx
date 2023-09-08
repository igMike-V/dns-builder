import axios from './axios'
import { API_URL } from '../utilities/settings'

const baseUrl = `${API_URL}/api/record-types`

const getRecordTypes = async () => {
  try {
    const req = await axios.get(baseUrl)
    return req.data
  } catch (err) {
    console.error(err.response.data.error)
  }
}

export default { getRecordTypes }
