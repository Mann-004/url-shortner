  import { loginUser, registerUser } from "../services/user.services.js"
  import { sanitizeUser } from "../utils/sanitizeUser.js"
  import { cookieOptionsForAccessToken, cookieOptionsForRefreshToken } from "../config/cookieOptions.js"
  import { errorResponse, successResponse } from "../utils/response.js"
  import { validateUserInput } from "../utils/validateUserInput.js"
  import { updateUserRefreshToken,findUserById } from "../dao/user.dao.js"
  import { getUsersAllUrl } from "../dao/shortUrl.dao.js"
  import chalk from "chalk"


  export const register_user = async (req, res, next) => {
    try {
      const { name, email, password } = req.body

      const { valid, message } = await validateUserInput({ name, email, password }, "register")
      if (!valid) return errorResponse(res, message, 400)

      const { newUser, token, refreshToken } = await registerUser(name, email, password)

      // console.log("new user register:", chalk.yellowBright(newUser))
      // console.log("token register:", chalk.cyanBright(token))

      const reqUserData = sanitizeUser(newUser)
      req.user = reqUserData

      res.cookie("accessToken", token, cookieOptionsForAccessToken)
      res.cookie("refreshToken", refreshToken, cookieOptionsForRefreshToken)

      return successResponse(res, "User registered successfully", reqUserData, 201)

    } catch (error) {
      next(error)
    }
  }


  export const login_user = async (req, res, next) => {
    try {
      const { email, password } = req.body

      const { existingUser, token, refreshToken } = await loginUser(email, password)

      const reqUserData = sanitizeUser(existingUser)
      req.user = reqUserData
      // console.log(req.user._id)

      res.cookie("accessToken", token, cookieOptionsForAccessToken)
      res.cookie("refreshToken", refreshToken, cookieOptionsForRefreshToken)

      return successResponse(res, "Login successfull", reqUserData, 200)

    } catch (error) {
      next(error)
    }
  }


  export const logout_user = async (req, res, next) => {
    try {
      if (req.user?.id) {
        await updateUserRefreshToken(req.user.id, null)
      }

      res.clearCookie("accessToken", cookieOptionsForAccessToken)
      res.clearCookie("refreshToken", cookieOptionsForRefreshToken)

      return successResponse(res, "Logout successful", null, 200)
    } catch (error) {
      next(error)
    }
  }

  export const getAllUrls = async (req, res, next) => {
    try {
      const userId = req.user?._id

      if (!userId) {
        return errorResponse(res, "User not authenticated", 401)
      }

      const urls = await getUsersAllUrl(userId)

      return successResponse(res, "Fetched all URLs", urls, 200)
    } catch (error) {
      next(error)
    }
  }

  
  export const getCurrentUser = async (req, res, next) => {
    const user = await findUserById(req.user._id)
    // console.log("current user",user)
    return successResponse(res, "checked current user", user, 200)

  }


