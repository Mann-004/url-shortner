import { getShortUrl } from "../dao/shortUrl.dao.js"
import { createShortUrl } from "../services/shortUrl.services.js"
import { errorResponse, successResponse } from "../utils/response.js"


export const createShortUrlController = async (req, res, next) => {
    try {
        const { full_url, slug } = req.body
        const userId = req.user?._id

        const shortUrl = await createShortUrl(full_url, userId, slug)
        return successResponse(res, "Short URL created successfully", shortUrl, 200)
    } catch (err) {
        next(err)
    }
}



export const handleRedirect = async (req, res, next) => {
    try {
        const { short_url } = req.params
        const urlEntry = await getShortUrl(short_url)

        if (!urlEntry) return errorResponse(res, "Short URL not found", 404)

        // console.log("url entry",urlEntry)
        return res.redirect(urlEntry.full_url)

    } catch (err) {
        next(err)
    }
}

