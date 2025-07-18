import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { Provider } from 'react-redux'

import './index.css'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import ShortenPage from './pages/ShortenPage'
import store from "./store/store"
import ProtectedRoute from './components/ProtectedRoute'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomePage />}>
      <Route index element={<AuthPage />} />
      <Route
        path="shorten"
        element={
          <ProtectedRoute>
            <ShortenPage />
          </ProtectedRoute>
        }
      />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
