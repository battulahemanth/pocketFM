import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '../../app/store'
import { addStory, deleteStory, updateStory } from '../../features/stories/storySlice'
import type { Episode, Story } from '../../types/story'

import './AdminDashboard.css'

const createEpisode = (): Episode => ({
  id: `ep-${Date.now()}-${Math.random()}`,
  title: '',
  duration: '10:00',
  audioUrl: '',
  locked: false,
})

const createStory = (): Story => ({
  id: `story-${Date.now()}-${Math.random()}`,
  title: '',
  author: '',
  rating: '4.5',
  plays: '0',
  image: '/images/story1.png',
  category: 'Fantasy',
  subcategory: 'Adventure',
  description: '',
  episodes: [createEpisode()],
})

function AdminDashboard() {
  const dispatch = useDispatch()
  const stories = useSelector((state: RootState) => state.stories.items)

  const [formData, setFormData] = useState<Story>(createStory())
  const [isEditing, setIsEditing] = useState(false)

  const resetForm = () => {
    setFormData(createStory())
    setIsEditing(false)
  }

  const updateField = <K extends keyof Story>(key: K, value: Story[K]) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const updateEpisode = (episodeId: string, field: keyof Episode, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      episodes: prev.episodes.map((episode) =>
        episode.id === episodeId ? { ...episode, [field]: value } : episode,
      ),
    }))
  }

  const addEpisode = () => {
    setFormData((prev) => ({
      ...prev,
      episodes: [...prev.episodes, createEpisode()],
    }))
  }

  const removeEpisode = (episodeId: string) => {
    setFormData((prev) => ({
      ...prev,
      episodes: prev.episodes.filter((episode) => episode.id !== episodeId),
    }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const sanitizedStory: Story = {
      ...formData,
      episodes: formData.episodes.map((episode, index) => ({
        ...episode,
        id: episode.id || `ep-${Date.now()}-${index}`,
      })),
    }

    if (isEditing) {
      dispatch(updateStory(sanitizedStory))
    } else {
      dispatch(addStory(sanitizedStory))
    }

    resetForm()
  }

  const handleEdit = (story: Story) => {
    setFormData(story)
    setIsEditing(true)
  }

  const handleDelete = (storyId: string) => {
    dispatch(deleteStory(storyId))

    if (isEditing && formData.id === storyId) {
      resetForm()
    }
  }

  return (
    <main className="admin-dashboard">
      <header className="admin-dashboard__header">
        <h1>Admin Dashboard</h1>
        <p>Manage stories, episodes, and content for the app.</p>
      </header>

      <section className="admin-dashboard__layout">
        <div className="admin-panel">
          <form className="admin-form" onSubmit={handleSubmit}>
            <label className="admin-form__full">
              Story title
              <input
                type="text"
                value={formData.title}
                onChange={(event) => updateField('title', event.target.value)}
                placeholder="Enter story title"
                required
              />
            </label>

            <label>
              Author
              <input
                type="text"
                value={formData.author}
                onChange={(event) => updateField('author', event.target.value)}
                placeholder="Author name"
                required
              />
            </label>

            <label>
              Rating
              <input
                type="text"
                value={formData.rating}
                onChange={(event) => updateField('rating', event.target.value)}
              />
            </label>

            <label>
              Plays
              <input
                type="text"
                value={formData.plays}
                onChange={(event) => updateField('plays', event.target.value)}
              />
            </label>

            <label>
              Category
              <input
                type="text"
                value={formData.category}
                onChange={(event) => updateField('category', event.target.value)}
              />
            </label>

            <label>
              Subcategory
              <input
                type="text"
                value={formData.subcategory}
                onChange={(event) => updateField('subcategory', event.target.value)}
              />
            </label>

            <label className="admin-form__full">
              Image URL
              <input
                type="text"
                value={formData.image}
                onChange={(event) => updateField('image', event.target.value)}
                placeholder="/images/story.png"
              />
            </label>

            <label className="admin-form__full">
              Description
              <textarea
                value={formData.description}
                onChange={(event) => updateField('description', event.target.value)}
                placeholder="Write a short description"
              />
            </label>

            <div className="story-spotlight admin-form__full">
              <div className="story-spotlight__header">
                <span className="story-spotlight__badge">Story Magic</span>
                <h3>{formData.title || 'New Story Preview'}</h3>
              </div>

              <div className="story-spotlight__grid">
                <div className="story-spotlight__card story-spotlight__card--purple">
                  <span>Total Episodes</span>
                  <strong>{formData.episodes.length}</strong>
                </div>

                <div className="story-spotlight__card story-spotlight__card--orange">
                  <span>Story Mood</span>
                  <strong>{formData.category || 'Fantasy'}</strong>
                </div>

                <div className="story-spotlight__card story-spotlight__card--pink">
                  <span>Reader Rating</span>
                  <strong>{formData.rating || '4.5'}</strong>
                </div>
              </div>

              <div className="story-spotlight__footer">
                <div>
                  <small>Audio Ready</small>
                  <p>{formData.episodes.length > 0 ? 'Episodes prepared for listening' : 'No episodes added yet'}</p>
                </div>
                <div className="story-spotlight__icon">🎧</div>
              </div>
            </div>

            <div className="episodes-manager admin-form__full">
              <div className="episodes-manager__header">
                <h3>Episodes</h3>
                <button type="button" className="admin-button admin-button--secondary" onClick={addEpisode}>
                  + Add Episode
                </button>
              </div>

              <div className="episodes-manager__list">
                {formData.episodes.map((episode, index) => (
                  <div key={episode.id} className="episode-card">
                    <div className="episode-card__number">{index + 1}</div>

                    <div className="episode-card__fields">
                      <input
                        type="text"
                        value={episode.title}
                        onChange={(event) => updateEpisode(episode.id, 'title', event.target.value)}
                        placeholder={`Episode ${index + 1} title`}
                      />

                      <div className="episode-card__row">
                        <input
                          type="text"
                          value={episode.duration}
                          onChange={(event) => updateEpisode(episode.id, 'duration', event.target.value)}
                          placeholder="18:20"
                        />

                        <input
                          type="text"
                          value={episode.audioUrl}
                          onChange={(event) => updateEpisode(episode.id, 'audioUrl', event.target.value)}
                          placeholder="/audio/story.mp3"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      className="admin-button admin-button--danger episode-card__remove"
                      onClick={() => removeEpisode(episode.id)}
                      disabled={formData.episodes.length === 1}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-form__actions">
              <button type="submit" className="admin-button admin-button--primary">
                {isEditing ? 'Update Story' : 'Add Story'}
              </button>

              <button type="button" className="admin-button admin-button--secondary" onClick={resetForm}>
                Reset
              </button>
            </div>
          </form>
        </div>

        <aside className="admin-list">
          <h2>All Stories</h2>

          <ul className="story-admin-list">
            {stories.map((story) => (
              <li key={story.id} className="story-admin-item">
                <div className="story-admin-item__info">
                  <img src={story.image} alt={story.title} />

                  <div className="story-admin-item__details">
                    <h3>{story.title}</h3>
                    <p>{story.category} • {story.episodes.length} episodes</p>
                  </div>
                </div>

                <div className="story-admin-item__actions">
                  <button type="button" className="admin-button admin-button--secondary" onClick={() => handleEdit(story)}>
                    Edit
                  </button>
                  <button type="button" className="admin-button admin-button--danger" onClick={() => handleDelete(story.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </main>
  )
}

export default AdminDashboard
