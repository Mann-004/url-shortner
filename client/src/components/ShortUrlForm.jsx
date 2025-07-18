import React, { useState, useEffect } from 'react'
import { Link2, Hash, Loader2 } from 'lucide-react'
import { createUrl, getAllUrls } from '../api/user.api'
const backendBase = import.meta.env.VITE_BACKEND_URL



const ShortenUrlForm = () => {
    const [formData, setFormData] = useState({ full_url: '', slug: '' })
    const [useSlug, setUseSlug] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [userUrls, setUserUrls] = useState([])
    const [favicons, setFavicons] = useState({})
    const [shortUrl, setShortUrl] = useState('')

    useEffect(() => {
        fetchUrls()
    }, [])

    const fetchUrls = async () => {
        try {
            const res = await getAllUrls()
            setUserUrls(res?.data || [])
        } catch (err) {
            console.error('Failed to fetch URLs:', err)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setShortUrl('')
        setError('')
        setTimeout(() => setSuccess(''), 3000)

        try {
            const payload = { full_url: formData.full_url }
            if (useSlug && formData.slug.trim()) {
                payload.slug = formData.slug.trim()
            }

            const res = await createUrl(payload)
            setShortUrl(res.data?.data?.short_url || '')
            setSuccess('Short URL created successfully!')
            setFormData({ full_url: '', slug: '' })
            setUseSlug(false)
            fetchUrls()
        } catch (err) {
            console.error(err)
            setError(err?.response?.data?.message || 'Something went wrong.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-zinc-800 text-white p-6 rounded-xl shadow-lg max-w-xl mx-auto mt-10 border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-center">URL Shortener</h2>

            {error && <p className="text-red-400 text-center mb-4">{error}</p>}
            {success && <p className="text-green-400 text-center mb-4">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm mb-2">Full URL</label>
                    <div className="relative">
                        <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="url"
                            name="full_url"
                            required
                            value={formData.full_url}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-zinc-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                            placeholder="https://example.com"
                        />
                    </div>
                </div>

                <label className="flex items-center space-x-2 text-sm">
                    <input
                        type="checkbox"
                        checked={useSlug}
                        onChange={() => setUseSlug(!useSlug)}
                        className="form-checkbox h-4 w-4 text-blue-500"
                    />
                    <span>Use custom slug</span>
                </label>

                {useSlug && (
                    <div>
                        <label className="block text-sm mb-2">Slug (optional)</label>
                        <div className="relative">
                            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                                placeholder="my-custom-slug"
                            />
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 bg-blue-600 text-white font-semibold rounded-lg transition duration-200 ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105'
                        }`}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <Loader2 className="animate-spin mr-2 h-5 w-5" />
                            Shortening...
                        </span>
                    ) : (
                        'Shorten URL'
                    )}
                </button>
            </form>

            <div className="mt-10">
                <h3 className="text-lg font-semibold mb-4">Your URLs</h3>
                <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800 pr-1">
                    {userUrls.length === 0 ? (
                        <p className="text-gray-400 text-sm">No URLs created yet.</p>
                    ) : (
                        <ul className="space-y-3">
                            {userUrls.map((url) => (
                                <li
                                    key={url._id}
                                    className="bg-zinc-700 p-3 rounded-md text-sm flex flex-col sm:flex-row sm:justify-between"
                                >
                                    <div className="flex items-center space-x-2">
                                        <img
                                            src={`https://www.google.com/s2/favicons?sz=64&domain=${new URL(url.full_url).hostname}`}
                                            alt="favicon"
                                            className="w-5 h-5 mr-2"
                                        />
                                        <div>
                                            <p className="text-gray-300 break-all">{url.full_url}</p>
                                            <a
                                                href={`${backendBase}/${url.short_url}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 hover:underline"
                                            >
                                                {url.short_url}
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                    )}
                </div>
            </div>
        </div>
    )
}

export default ShortenUrlForm
