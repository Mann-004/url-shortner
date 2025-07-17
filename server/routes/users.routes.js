import express from "express"
import { getAllUrls, login_user, logout_user, register_user } from "../controllers/user.controllers.js"
import { authMiddleware, verifyAccessToken } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/register_user",register_user)
router.post("/login_user",login_user)
router.post("/logout_user",verifyAccessToken,logout_user)
router.get("/urls",authMiddleware,getAllUrls)

export default router
