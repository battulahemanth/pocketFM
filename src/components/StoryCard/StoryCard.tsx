import { useNavigate } from 'react-router-dom'
import type { Story } from '../../types/story'
import './StoryCard.css'

type StoryCardProps = {
  story: Story
  rank?: number
  showCategory?: boolean
}

function StoryCard({
  story,
  rank,
  showCategory = false,
}: StoryCardProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/story/${story.id}`)
  }

  return (
    <article
      className="story-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          handleClick()
        }
      }}
    >

      <div className="story-card-image-wrapper">

        <img
          src={story.image}
          alt={story.title}
          className="story-card-image"
        />

        {rank && (
          <span className="story-card-rank">
            #{rank}
          </span>
        )}

      </div>

      <div className="story-card-content">

        <h3>{story.title}</h3>

        <p>{story.author}</p>

        {showCategory && (
          <span className="story-card-category">
            {story.category}
          </span>
        )}

        <div className="story-card-meta">

          <span>
            ⭐ {story.rating}
          </span>

          <span>
            🎧 {story.plays}
          </span>

        </div>

      </div>

    </article>
  )
}

export default StoryCard