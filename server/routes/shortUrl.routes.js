import express from "express"
import { createShortUrlController, deleteShortUrlController } from "../controllers/shortUrl.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/create/shortUrl",authMiddleware,createShortUrlController)
router.delete("/delete/:shortUrlId",authMiddleware,deleteShortUrlController)


export default router