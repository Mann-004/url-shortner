
const validators = {
  register: ({ name, email, password }) => {
    if (!name || !email || !password) return { valid: false, message: "All fileds are required" }
    if (!name || name.trim().length < 4) return { valid: false, message: "Name is too short" }

    if (!email || !password) return { valid: false, message: "Email and password are required" }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return { valid: false, message: "Invalid email format" }

    if (password.length < 6) return { valid: false, message: "Password too short (min 6 chars)" }

    return { valid: true }
  },
  login: ({ email, password }) => {
    if (!email || !password) return { valid: false, message: "Email and password are required" }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return { valid: false, message: "Invalid email format" }

    return { valid: true };
  },

};

export const validateUserInput = (data, type = "register") => {
  const validate = validators[type]
  if (!validate) {
    return { valid: false, message: `Unknown validation type: ${type}` }
  }
  return validate(data)
}
