import { useRef } from 'react'
import StoryCard from '../StoryCard/StoryCard'
import type { Story } from '../../types/story'
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

  const scrollRail = (direction: number) => {
    railRef.current?.scrollBy({ left: direction * 400, behavior: 'smooth' })
  }

  if (stories.length === 0) {
    return null
  }

  return (
    <section className="story-section">
      <header className="story-section-header">
        <h2>{title}</h2>
        <div className="rail-controls" aria-label={`${title} controls`}>
          <button
            className="rail-arrow"
            type="button"
            aria-label={`Scroll ${title} left`}
            onClick={() => scrollRail(-1)}
          >
            &#8249;
          </button>
          <button
            className="rail-arrow"
            type="button"
            aria-label={`Scroll ${title} right`}
            onClick={() => scrollRail(1)}
          >
            &#8250;
          </button>
        </div>
      </header>

      <div className="story-rail" ref={railRef}>
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
