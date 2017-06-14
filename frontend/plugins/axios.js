import axios from 'axios'

export default axios.create({
  baseURL: process.BROWSER_BUILD ? process.env.baseUrl : process.env.apiUrl
})
