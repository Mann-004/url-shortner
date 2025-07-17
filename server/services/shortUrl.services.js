import { nanoid } from "nanoid"
import { findExistingUrl, findExistingSlug, saveShortUrl } from "../dao/shortUrl.dao.js"
import { ConflictError } from "../utils/handleError.js"

export const createShortUrl = async (fullUrl, userId, slug = null) => {
    if (!fullUrl) throw new Error("Full URL is required")

    const existingUrl = await findExistingUrl(fullUrl, userId)
    if (existingUrl) throw new ConflictError("URL already exists")
    const shortUrl = slug || nanoid(8)
    if (slug) {
        const existingSlug = await findExistingSlug(shortUrl)
        if (existingSlug) throw new ConflictError("Slug already exists")
    }

    await saveShortUrl(fullUrl, shortUrl, userId)
    return `${process.env.APP_URL}${shortUrl}`
}

