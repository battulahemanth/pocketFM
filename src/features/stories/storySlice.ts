import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { API_URL } from '../../api/config'
import type { Story } from '../../types/story'

interface StoriesState {
  items: Story[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: StoriesState = {
  items: [],
  status: 'idle',
  error: null,
}

export const fetchStories = createAsyncThunk(
  'stories/fetchStories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/api/stories/getAllStories`
      )

      if (!response.ok) {
        throw new Error(
          `Failed to fetch stories: ${response.status}`
        )
      }

      const data = await response.json()

      console.log('MongoDB stories:', data)

      // Backend returns:
      // [ story1, story2, story3 ]
      if (Array.isArray(data)) {
        return data as Story[]
      }

      // If backend returns:
      // { stories: [ story1, story2 ] }
      if (Array.isArray(data.stories)) {
        return data.stories as Story[]
      }

      throw new Error('Invalid stories response from backend')
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Failed to fetch stories'

      return rejectWithValue(message)
    }
  }
)

const storySlice = createSlice({
  name: 'stories',

  initialState,

  reducers: {
    addStory: (state, action: PayloadAction<Story>) => {
      state.items.push(action.payload)
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

      // API request started
      .addCase(fetchStories.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })

      // API request successful
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
        state.error = null
      })

      // API request failed
      .addCase(fetchStories.rejected, (state, action) => {
        state.status = 'failed'
        state.error =
          (action.payload as string) ||
          'Failed to fetch stories'
      })
  },
})

export const { addStory, updateStory, deleteStory } = storySlice.actions

export default storySlice.reducer
