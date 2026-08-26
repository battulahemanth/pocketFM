import { configureStore } from '@reduxjs/toolkit'
import storyReducer from '../features/stories/storySlice'

export const store = configureStore({
  reducer: {
    stories: storyReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
