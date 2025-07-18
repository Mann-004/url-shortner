// components/ShortenUrlForm.jsx
import React, { useState } from 'react'
import { Link2, Loader2, Hash } from 'lucide-react'
import { createUrl } from '../api/user.api'

const ShortenUrlForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ full_url: '', slug: '' })
  const [useSlug, setUseSlug] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setTimeout(() => setSuccess(''), 3000)

    try {
      const payload = { full_url: formData.full_url }
      if (useSlug && formData.slug.trim()) {
        payload.slug = formData.slug.trim()
      }

      await createUrl(payload)
      setSuccess('Short URL created successfully')
      setFormData({ full_url: '', slug: '' })
      setUseSlug(false)
      onSuccess()
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
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
      {error && <p className="text-red-500 text-left text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-left text-sm mb-4">{success}</p>}

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
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full pl-4 pr-4 py-3 rounded-lg bg-zinc-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            placeholder="my-custom-slug"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-[#1eb9a4] text-white font-semibold rounded-lg transition duration-200"
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
  )
}

export default ShortenUrlForm
