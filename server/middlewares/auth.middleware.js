import jwt from "jsonwebtoken"
import { errorResponse } from "../utils/response.js"
import { findUserById } from "../dao/user.dao.js"
import { sanitizeUser } from "../utils/sanitizeUser.js"
import { verifyToken } from "../utils/signToken.js"

export const verifyAccessToken = (req, res, next) => {
  const token = req.cookies.accessToken

  if (!token) return errorResponse(res, "No access token", 401)

  try {
    //console.log("Access Token:", token)
    //console.log("JWT_SECRET_KEY:", process.env.JWT_SECERET_KEY)

    const decoded = jwt.verify(token, process.env.JWT_SECERET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    console.error("JWT Verify Error:", error.message)
    return errorResponse(res, "Invalid access token", 403)
  }
}

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.accessToken
  // console.log("Requested URL:", req.originalUrl)
  // console.log("Cookies received:", req.cookies)

  // console.log(token)
  // console.log("token:",token)
  if (!token) return errorResponse(res, "Unauthorized", 401)

  try {
    const decode = await verifyToken(token)
    // console.log(decode)
    const user = await findUserById(decode.id)
    console.log("user", user)
    if (!user) return errorResponse(res, "Unauthorized", 401)

    const reqUserData = sanitizeUser(user)
    req.user = reqUserData
    next()

  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized", error
    })
  }

}
