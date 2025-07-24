import axiosInstance from "../utils/axiosInstance"

export const loginUser = async (email, password) => {
  const { data } = await axiosInstance.post("/api/user/login_user", { email, password })
  return data
}

export const registerUser = async (name, email, password) => {
  const { data } = await axiosInstance.post("/api/user/register_user", {
    name,
    email,
    password
  })
  return data
}

export const logoutUser = async () => {
  const { data } = await axiosInstance.post("/api/user/logout_user")
  return data
}

export const createUrl = async (payload) => {
  const { data } = await axiosInstance.post("/api/create/shortUrl", payload)
  return data
}

export const getAllUrls = async () => {
  const { data } = await axiosInstance.get("/api/user/urls")
  return data
}

export const deleteUrl = async (shorUrlId) => {
  const { data } = await axiosInstance.delete(`/api/delete/${shorUrlId}`)
  return data
}
export const profileOfUser = async () => {
  const { data } = await axiosInstance.get("api/user/me")
  return data
}

