import { useParams, useNavigate } from 'react-router-dom'
import { stories } from '../../jsonFiles/stories'
import './StoryDetails.css'

function StoryDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const story = stories.find((item) => item.id === id)

  if (!story) {
    return (
      <main className="story-details">
        <h1>Story not found</h1>

        <button
          type="button"
          onClick={() => navigate('/')}
        >
          Go Home
        </button>
      </main>
    )
  }

  return (
    <main className="story-details">

      {/* BACK BUTTON */}

      <button
        type="button"
        className="back-button"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* STORY HEADER */}

      <section className="story-details-header">

        <img
          src={story.image}
          alt={story.title}
          className="story-details-image"
        />

        <div className="story-details-info">

          <h1>{story.title}</h1>

          <p className="story-author">
            By {story.author}
          </p>

          <div className="story-meta">

            <span>
              ⭐ {story.rating}
            </span>

            <span>
              🎧 {story.plays}
            </span>

            <span>
              {story.category}
            </span>

          </div>

          <p className="story-description">
            {story.description}
          </p>

          <button
            type="button"
            className="start-button"
            onClick={() => {
              const firstEpisode = story.episodes[0]

              if (firstEpisode && !firstEpisode.locked) {
                navigate(
                  `/story/${story.id}/episode/${firstEpisode.id}`
                )
              }
            }}
          >
            ▶ Start Listening
          </button>

        </div>

      </section>

      {/* EPISODES */}

      <section className="episodes-section">

        <div className="episodes-header">

          <h2>Episodes</h2>

          <span>
            {story.episodes.length} Episodes
          </span>

        </div>

        <div className="episodes-list">

          {story.episodes.map((episode, index) => (

            <div
              key={episode.id}
              className="episode-card"
            >

              <div className="episode-number">
                {index + 1}
              </div>

              <div className="episode-info">

                <h3>
                  {episode.title}
                </h3>

                <p>
                  {episode.duration}
                </p>

              </div>

              <button
                type="button"
                className="episode-play-button"
                disabled={episode.locked}
                onClick={() => {
                  if (!episode.locked) {
                    navigate(
                      `/story/${story.id}/episode/${episode.id}`
                    )
                  }
                }}
              >
                {episode.locked ? '🔒' : '▶'}
              </button>

            </div>

          ))}

        </div>

      </section>

    </main>
  )
}

export default StoryDetails