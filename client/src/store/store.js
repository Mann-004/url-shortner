import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./userSlice"


const store = configureStore({
  reducer: {
    auth: authReducer
  },
  devTools:true
})

export default store
