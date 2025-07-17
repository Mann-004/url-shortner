import mongoose from "mongoose"

const shortUrlSchema = new mongoose.Schema({
    full_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
}, {
    timestamps: true
})

export default mongoose.model("shortUrl", shortUrlSchema)
