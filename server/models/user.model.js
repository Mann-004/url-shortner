import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        require: true,

    },
    refreshToken: {
        type: String,
        default: null
    },
    avatar: {
        type: String,
        required: false,
        default: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp",
    }

}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10);
    next()
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)

}

const userModel = mongoose.model("user", userSchema)
export default userModel