import axios from "axios"
import { getToken } from "../../cookies"

const apiPrados = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_PRADOS
})

const apiPermissionNoAuth = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL_PERMISSION
})

const apiPermission = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL_PERMISSION
})

const apiRecord = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL_RECORD
})

const apiInvoicing = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL_INVOICING
})

const apiCotacao = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL_COTACAO
})

const apiImportEmpresa = axios.create({
  baseURL: import.meta.env.VITE_REACT_API_URL_IMPORTEMPRESA
})

const apiWallet = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL_WALLET
})

const apiD4Sign = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL_D4SIGN
})

const apiUpload = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL_UPLOAD
})

const apiMovement = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL_MOVEMENT
})

const apiSupport = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL_SUPPORT
})

const apiReporting = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL_REPORTING
})

// Interceptors
apiPrados.interceptors.request.use((config) => {
  const accessToken = getToken()

  if (accessToken) {
    config.headers.Authorization = accessToken
  }
  return config
})

apiRecord.interceptors.request.use((config) => {
  const accessToken = getToken()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

apiImportEmpresa.interceptors.request.use((config) => {
  const accessToken = getToken()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

apiPermission.interceptors.request.use((config) => {
  const accessToken = getToken()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

apiInvoicing.interceptors.request.use((config) => {
  const accessToken = getToken()

  config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

apiCotacao.interceptors.request.use((config) => {
  const accessToken = getToken()

  config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

apiWallet.interceptors.request.use((config) => {
  const accessToken = getToken()

  config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

apiUpload.interceptors.request.use((config) => {
  const accessToken = getToken()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

apiMovement.interceptors.request.use((config) => {
  const accessToken = getToken()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

apiSupport.interceptors.request.use((config) => {
  const accessToken = getToken()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

apiReporting.interceptors.request.use((config) => {
  const accessToken = getToken()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

export {
  apiPrados,
  apiPermissionNoAuth,
  apiRecord,
  apiInvoicing,
  apiCotacao,
  apiWallet,
  apiD4Sign,
  apiPermission,
  apiImportEmpresa,
  apiUpload,
  apiMovement,
  apiSupport,
  apiReporting
}
