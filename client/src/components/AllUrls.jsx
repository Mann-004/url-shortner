const backendBase = import.meta.env.VITE_BACKEND_URL
import { useState } from "react"
import { deleteUrl } from "../api/user.api"

const YourUrls = ({ urls, setUrls }) => {

  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  const confirmDelete = (id) => {
    setSelectedId(id)
    setShowConfirm(true)
  }

  const handleDelete = async () => {
    try {
      await deleteUrl(selectedId)
      setUrls((prev) => prev.filter((url) => url._id !== selectedId))
    } catch (error) {
      console.error("Failed to delete URL:", error)
    } finally {
      setShowConfirm(false)
      setSelectedId(null)
    }
  }


  return (
    <div className="bg-[#f1f1f1] dark:bg-zinc-900 text-black dark:text-white p-4  shadow-md  w-full mt-10 absolute left-0 px-8" >
      <h3 className="text-lg font-semibold mb-4">Your URLs</h3>
      <div className="max-h-80 overflow-y-auto scrollbar-thin dark:scrollbar-thumb-zinc-600 dark:scrollbar-track-zinc-800 scrollbar-thumb-white scrollbar-track-gray-500  pr-2">
        {urls.length === 0 ? (
          <p className="text-gray-400 text-sm">No URLs created yet.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {urls.map((url) => (
              <li
                key={url._id}
                className="dark:bg-blue-600 bg-[#178c7c] p-3 rounded-md text-sm flex items-start gap-2 relative"
              >
                <img
                  src={`https://www.google.com/s2/favicons?sz=64&domain=${new URL(url.full_url)}`}
                  alt="favicon"
                  className="w-10 h-10 mt-1"
                />
                <div>
                  <p className="text-gray-100 break-words">{url.full_url}</p>
                  <a
                    href={`${backendBase}/${url.short_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-100 hover:underline"
                  >
                    {url.short_url}
                  </a>
                </div>
                <button
                  onClick={() => confirmDelete(url._id)}
                  className="dark:bg-red-700 bg-red-600 text-white rounded-md px-4 py-2 text-xs mt-2 block absolute right-10"
                >
                  Delete
                </button>
              </li>

            ))}
          </ul>
        )}
        {
          showConfirm && (
            <div className="fixed inset-0  bg-white bg-opacity-50 flex items-center justify-center z-50">
              <div className="dark:bg-zinc-800 bg-white p-6 rounded-xl dark:text-white max-w-sm w-full shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Delete Confirmation</h2>
                <p className="mb-6">Are you sure you want to delete this URL?</p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="px-4 py-2 dark:bg-gray-600 bg-gray-200 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 rounded hover:bg-red-500 dark:text-black text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>


  )


}

export default YourUrls
