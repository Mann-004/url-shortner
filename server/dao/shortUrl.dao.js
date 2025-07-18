import urlSchema from "../models/shortUrl.model.js"
import { ConflictError, NotFoundError } from "../utils/handleError.js"

export const saveShortUrl = async (longUrl, shortUrl, userId) => {
    try {
        const newUrl = new urlSchema({
            full_url: longUrl,
            short_url: shortUrl,
            user: userId
        })
        await newUrl.save()
    } catch (err) {
        if (err.code === 11000) {
            throw new ConflictError("Short URL already exists")
        }
        throw new Error(err.message || "Failed to save short URL")
    }
}

export const findExistingUrl = async (url, userId) => {
    try {
        return await urlSchema.findOne({ full_url: url, user: userId })
    } catch (err) {
        throw new Error(err.message || "Failed to check existing URL")
    }
}

export const findExistingSlug = async (slug) => {
    try {
        return await urlSchema.findOne({ short_url: slug })
    } catch (err) {
        throw new Error(err.message || "Failed to check slug")
    }
}


export const getShortUrl = async (short_url) => {
    const urlEntry = await urlSchema.findOneAndUpdate(
        {
            short_url
        },
        {
            $inc: { clicks: 1 }
        },
        {
            new: true
        }
    )
    return urlEntry
}

export const getUsersAllUrl = async (id) => {
    return await urlSchema.find({ user: id })

}



export const deleteShortUrlById = async (shortUrlId) => {
    const result = await urlSchema.findOneAndDelete({ _id: shortUrlId })
    return result
}



