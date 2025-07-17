export const cookieOptionsForAccessToken = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", 
  sameSite: "Lax",
  maxAge: 1000 * 60 * 60,
  path: "/" 
}

export const cookieOptionsForRefreshToken = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", 
  sameSite: "Strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/"
}
