import axios from 'axios'

// Use the Docker host URL
const api = axios.create({
  baseURL: 'http://localhost:8000/api',  // Updated to use localhost
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
})

export const runScript = async (category, password) => {
  try {
    const response = await api.post('/run_script/', {
      category_name: category,
      password: password
    })
    return response.data
  } catch (error) {
    console.error('API Error:', error)
    throw error.response?.data || error
  }
}

export const managePivot = async (action, filenames = []) => {
  try {
    const response = await api.post('/manage_pivot/', {
      action,
      filenames
    })
    return response.data
  } catch (error) {
    console.error('API Error:', error)
    throw error.response?.data || error
  }
}

export const manageScreenshot = async (action, filenames = []) => {
  try {
    const response = await api.post('/manage_screenshot/', {
      action,
      filenames
    })
    return response.data
  } catch (error) {
    console.error('API Error:', error)
    throw error.response?.data || error
  }
}