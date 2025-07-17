export const sanitizeUser = (user) => {
  const reqUserData= user.toObject()
  delete reqUserData.password
  return reqUserData
}
