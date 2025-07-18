import jwt from "jsonwebtoken"
import { errorResponse } from "../utils/response.js"
import { findUserById } from "../dao/user.dao.js"
import { sanitizeUser } from "../utils/sanitizeUser.js"
import { signToken } from "../utils/signToken.js"
import { cookieOptionsForAccessToken } from "../config/cookieOptions.js"

export const authMiddleware = async (req, res, next) => {
  let accessToken = req.cookies.accessToken
  const refreshToken = req.cookies.refreshToken

  try {

    if (accessToken) {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECERET_KEY)
      const user = await findUserById(decoded.id)
      if (!user) return errorResponse(res, "Unauthorized", 401)

      req.user = sanitizeUser(user)
      return next()
    }
  } catch (error) {
    console.log("Access token expired or invalid:", error.message)
 
  }


  if (!refreshToken) return errorResponse(res, "Unauthorized - no refresh token", 401)

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY)
    const user = await findUserById(decoded.id)
    if (!user) return errorResponse(res, "Unauthorized - user not found", 401)


    const newAccessToken = await signToken({ id: user._id, email: user.email })
    res.cookie("accessToken", newAccessToken, cookieOptionsForAccessToken)

    req.user = sanitizeUser(user)
    return next()
  } catch (error) {
    console.log("Refresh token invalid:", error.message)
    return errorResponse(res, "Unauthorized - invalid refresh token", 401)
  }
}
