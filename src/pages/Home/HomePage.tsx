import StoryRail from '../../components/StoryRail/StoryRail'
import { stories } from '../../jsonFiles/stories'

import './HomePage.css'

function HomePage() {
  // =========================================
  // TOP PICKS
  // Highest rated stories first
  // =========================================

  const topPicks = [...stories].sort(
    (a, b) => Number(b.rating) - Number(a.rating)
  )

  // =========================================
  // PLAY COUNT
  // Converts 1.2M / 980K into numbers
  // =========================================

  const getPlayCount = (plays: string): number => {
    const value = parseFloat(plays)

    if (plays.toUpperCase().includes('M')) {
      return value * 1_000_000
    }

    if (plays.toUpperCase().includes('K')) {
      return value * 1_000
    }

    return value
  }

  // =========================================
  // POPULAR STORIES
  // Highest plays first
  // =========================================

  const popularStories = [...stories].sort(
    (a, b) => getPlayCount(b.plays) - getPlayCount(a.plays)
  )

  // =========================================
  // CATEGORY STORIES
  // =========================================

  const adventureStories = stories.filter(
    (story) => story.subcategory.toLowerCase() === 'adventure'
  )

  const fantasyStories = stories.filter(
    (story) => story.category.toLowerCase() === 'fantasy'
  )

  const magicStories = stories.filter(
    (story) => story.subcategory.toLowerCase() === 'magic'
  )

  const dramaStories = stories.filter(
    (story) => story.category.toLowerCase() === 'drama'
  )

  const comedyStories = stories.filter(
    (story) => story.subcategory.toLowerCase() === 'comedy'
  )

  return (
    <main className="pocket-home">

      {/* =========================================
          TOP PICKS
      ========================================= */}

      <StoryRail
        title="Top Picks for You"
        stories={topPicks}
        showTopBadge
      />

      {/* =========================================
          POPULAR STORIES
      ========================================= */}

      <StoryRail
        title="Popular on OUR Stories"
        stories={popularStories}
        showCategory
      />

      {/* =========================================
          ADVENTURE STORIES
      ========================================= */}

      {adventureStories.length > 0 && (
        <StoryRail
          title="Adventure Stories"
          stories={adventureStories}
          showCategory
        />
      )}

      {/* =========================================
          FANTASY STORIES
      ========================================= */}

      {fantasyStories.length > 0 && (
        <StoryRail
          title="Fantasy Stories"
          stories={fantasyStories}
          showCategory
        />
      )}

      {/* =========================================
          MAGIC STORIES
      ========================================= */}

      {magicStories.length > 0 && (
        <StoryRail
          title="Magic Stories"
          stories={magicStories}
          showCategory
        />
      )}

      {/* =========================================
          DRAMA STORIES
      ========================================= */}

      {dramaStories.length > 0 && (
        <StoryRail
          title="Drama Stories"
          stories={dramaStories}
          showCategory
        />
      )}

      {/* =========================================
          COMEDY STORIES
      ========================================= */}

      {comedyStories.length > 0 && (
        <StoryRail
          title="Comedy Stories"
          stories={comedyStories}
          showCategory
        />
      )}

    </main>
  )
}

export default HomePage