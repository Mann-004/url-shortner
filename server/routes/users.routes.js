import express from "express"
import { getAllUrls, getCurrentUser, login_user, logout_user, register_user } from "../controllers/user.controllers.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/register_user", register_user)
router.post("/login_user", login_user)
router.post("/logout_user", authMiddleware, logout_user)
router.get("/urls", authMiddleware, getAllUrls)
router.get("/me",authMiddleware,getCurrentUser)

export default router
