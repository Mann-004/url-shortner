import userModel from "../models/user.model.js"

export const findUserByEmail = async (email) => {
  return await userModel.findOne({ email })
}

export const createNewUser = async (name, email, password) => {
  return await userModel.create({ name, email, password })
}

export const updateUserRefreshToken = async (userId, refreshToken) => {
  return await userModel.findByIdAndUpdate(
    userId,
    { refreshToken },
    { new: true }
  )
}

export const findUserById = async (id) => {
  return await userModel.findById(id).select("-password")
}


