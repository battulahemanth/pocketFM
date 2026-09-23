import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { getStories } from '../../api/storyApi'
import type { Story } from '../../types/story'

type StoryState = {
  items: Story[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const mapStoryResponse = (stories: Story[]): Story[] =>
  stories.map((story) => ({
    ...story,
    episodes: story.episodes.map((episode) => ({
      ...episode,
      audioUrl: episode.audioUrl.replace(/\s*–\s*/g, ' – '),
    })),
  }))

export const fetchStories = createAsyncThunk<Story[], void, { rejectValue: string }>(
  'stories/fetchStories',
  async (_, { rejectWithValue }) => {
    try {
      return mapStoryResponse(await getStories())
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch stories')
    }
  },
)

const initialState: StoryState = {
  items: [],
  status: 'idle',
  error: null,
}

const storySlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    setStories: (state, action: PayloadAction<Story[]>) => {
      state.items = action.payload
    },
    addStory: (state, action: PayloadAction<Story>) => {
      state.items = [action.payload, ...state.items]
    },
    updateStory: (state, action: PayloadAction<Story>) => {
      const index = state.items.findIndex((story) => story.id === action.payload.id)

      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteStory: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((story) => story.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = 'succeeded'
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Failed to fetch stories'
      })
  },
})

export const { setStories, addStory, updateStory, deleteStory } = storySlice.actions

export default storySlice.reducer
