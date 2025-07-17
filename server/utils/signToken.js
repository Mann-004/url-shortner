import jwt, { decode } from "jsonwebtoken"

export const signToken = async (payload) => {
    return jwt.sign(payload, process.env.JWT_SECERET_KEY, { algorithm: "HS384", expiresIn: "1h" })
}
export const signRefreshToken = async (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
        algorithm: "HS384",
        expiresIn: "7d"
    })
}

export const verifyToken = async (payload) => {
    try {
        const decoded = await jwt.verify(payload, process.env.JWT_SECERET_KEY)
    //    console.log("Decoded Token:", decoded) 
        return decoded
    } catch (error) {
        throw new Error("Token verification failed");
    }
}