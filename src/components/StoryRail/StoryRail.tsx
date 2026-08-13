import { useRef } from 'react'
import type { Story } from '../../types/story'
import StoryCard from '../StoryCard/StoryCard'
import './StoryRail.css'

type StoryRailProps = {
  title: string
  stories: Story[]
  showTopBadge?: boolean
  showCategory?: boolean
}

function StoryRail({
  title,
  stories,
  showTopBadge = false,
  showCategory = false,
}: StoryRailProps) {
  const railRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!railRef.current) return

    railRef.current.scrollBy({
      left: direction === 'right' ? 900 : -900,
      behavior: 'smooth',
    })
  }

  return (
    <section className="story-section">

      <div className="story-section-header">

        <h2>{title}</h2>

        <div className="rail-controls">

          <button
            type="button"
            className="rail-arrow"
            onClick={() => scroll('left')}
            aria-label={`Scroll ${title} left`}
          >
            ‹
          </button>

          <button
            type="button"
            className="rail-arrow"
            onClick={() => scroll('right')}
            aria-label={`Scroll ${title} right`}
          >
            ›
          </button>

        </div>

      </div>

      <div
        ref={railRef}
        className="story-rail"
      >

        {stories.map((story, index) => (
          <StoryCard
            key={story.id}
            story={story}
            rank={showTopBadge ? index + 1 : undefined}
            showCategory={showCategory}
          />
        ))}

      </div>

    </section>
  )
}

export default StoryRail