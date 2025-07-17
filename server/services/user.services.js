import chalk from "chalk"
import { createNewUser, findUserByEmail, updateUserRefreshToken } from "../dao/user.dao.js"
import { BadRequestError, ConflictError } from "../utils/handleError.js"
import { signRefreshToken, signToken } from "../utils/signToken.js"

export const registerUser = async (name, email, password) => {
  const existingUser = await findUserByEmail(email)
  if (existingUser) throw new ConflictError("User already exists")

  const newUser = await createNewUser(name, email, password)
  const token = await signToken({ id: newUser._id, email: newUser.email })
  const refreshToken = await signRefreshToken({ id: newUser._id })

  await updateUserRefreshToken(newUser._id, refreshToken)

  return { newUser, token, refreshToken }
}

export const loginUser = async (email, password) => {
  const existingUser = await findUserByEmail(email)
  if (!existingUser) throw new BadRequestError("Invalid email or password",)
  const isPasswordValid = await existingUser.comparePassword(password)
  if (!isPasswordValid) throw new BadRequestError("Invalid email or password",)

  const token = await signToken({ id: existingUser._id, email: existingUser.email })
  const refreshToken = await signRefreshToken({ id: existingUser._id })

  //   console.log("acessToken",chalk.red(token))
  //   console.log("refreshToken",chalk.blue(refreshToken))

  await updateUserRefreshToken(existingUser._id, refreshToken)
  return { existingUser, token, refreshToken }
}
