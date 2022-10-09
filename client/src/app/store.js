import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../redux/auth/authSlice'
import exerciseReducer from '../redux/exercises/exerciseSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    exercises: exerciseReducer,
  },
});