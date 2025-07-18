import { configDotenv } from "dotenv"
configDotenv({
    path: "./.env",
    quiet:true
})

import express from "express"
import cookieParser from "cookie-parser"

import connectDB from "./db/db.connection.js"
import userRoutes from "./routes/users.routes.js"
import shortUrlRoutes from "./routes/shortUrl.routes.js"
import { errorHandler } from "./utils/handleError.js"
import { handleRedirect } from "./controllers/shortUrl.controller.js"
import { authMiddleware } from "./middlewares/auth.middleware.js"
import cors from "cors"
const app = express()
const PORT = process.env.PORT || 8000


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}))


app.use("/api/user",userRoutes)
app.use("/api",shortUrlRoutes)
app.get("/:short_url", handleRedirect)



app.use(errorHandler)

app.listen(PORT, () => {
    connectDB()
    console.log(`Server running at ${PORT}`)
})
