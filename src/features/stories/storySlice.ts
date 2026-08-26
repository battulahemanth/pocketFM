import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { stories as defaultStories } from '../../jsonFiles/stories'
import type { Story } from '../../types/story'

type StoryState = {
  items: Story[]
}

const storedStories = localStorage.getItem('pocketfm-stories')

const initialState: StoryState = {
  items: storedStories ? JSON.parse(storedStories) : defaultStories,
}

const storySlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    setStories: (state, action: PayloadAction<Story[]>) => {
      state.items = action.payload
      localStorage.setItem('pocketfm-stories', JSON.stringify(action.payload))
    },
    addStory: (state, action: PayloadAction<Story>) => {
      state.items = [action.payload, ...state.items]
      localStorage.setItem('pocketfm-stories', JSON.stringify(state.items))
    },
    updateStory: (state, action: PayloadAction<Story>) => {
      const index = state.items.findIndex((story) => story.id === action.payload.id)

      if (index !== -1) {
        state.items[index] = action.payload
        localStorage.setItem('pocketfm-stories', JSON.stringify(state.items))
      }
    },
    deleteStory: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((story) => story.id !== action.payload)
      localStorage.setItem('pocketfm-stories', JSON.stringify(state.items))
    },
  },
})

export const { setStories, addStory, updateStory, deleteStory } = storySlice.actions

export default storySlice.reducer
