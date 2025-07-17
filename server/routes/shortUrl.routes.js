import express from "express"
import { createShortUrlController } from "../controllers/shortUrl.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/shortUrl",authMiddleware,createShortUrlController)


export default router