import axios from 'axios'
import { toast } from 'react-toastify'
import { handleLogoutAPI, refreshTokenAPI } from '~/apis'

let authorizedAxiosInstance = axios.create()

authorizedAxiosInstance.defaults.baseURL = 'https://rbac-ideft.onrender.com'

authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

authorizedAxiosInstance.defaults.withCredentials = true

authorizedAxiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

let refreshTokenPromise = null

authorizedAxiosInstance.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response?.status === 401) {
    handleLogoutAPI().then(() => {
      location.href = '/login'
    })
  }

  const originalRequest = error.config
  if (error.response?.status === 410 && originalRequest) {
    if (!refreshTokenPromise) {
      const refreshToken = localStorage.getItem('refreshToken')

      refreshTokenPromise = refreshTokenAPI(refreshToken)
        .then((res) => {
          const { accessToken } = res.data
          localStorage.setItem('accessToken', accessToken)
          authorizedAxiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`
        })
        .catch((_err) => {
          handleLogoutAPI().then(() => {
            location.href = '/login'
          })

          return Promise.reject(_err)
        })
        .finally(() => {
          refreshTokenPromise = null
        })
    }
    return refreshTokenPromise.then(() => {
      return authorizedAxiosInstance(originalRequest)
    })

  }

  if (error.response?.status !== 410) {
    toast.error(error.response?.data?.message || error?.message)
  }

  return Promise.reject(error)
})

export default authorizedAxiosInstance