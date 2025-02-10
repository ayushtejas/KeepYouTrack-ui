import axios from "axios"

export const baseUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

export const api = axios.create({
  baseURL: `${baseUrl}/api`
});

export const getToken = ()=>{
  const token = localStorage.getItem("token")
  return token
}
