import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

const server = "https://dummyjson.com/"

const connection: AxiosInstance = axios.create({
  baseURL: server,
})

const requestInterceptor: any = (config: AxiosRequestConfig) => {
  config.headers = {
    "Content-Type": "multipart/form-data",
    Accept: "*/*",
    // Authorization: "Bearer " + tokenData,
    // lang: lang,
  }
  return config
}

const responseInterceptor = (response: AxiosResponse) => {
  return response
}

connection.interceptors.request.use(requestInterceptor)
connection.interceptors.response.use(responseInterceptor)

export default connection
