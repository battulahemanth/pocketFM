import { useSelector } from 'react-redux'

import StoryRail from '../../components/StoryRail/StoryRail'
import type { RootState } from '../../app/store'

import './HomePage.css'

function HomePage() {
  const stories = useSelector((state: RootState) => state.stories.items)

  const topPicks = [...stories].sort(
    (a, b) => Number(b.rating) - Number(a.rating)
  )

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

  const popularStories = [...stories].sort(
    (a, b) => getPlayCount(b.plays) - getPlayCount(a.plays)
  )

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
      <StoryRail title="Top Picks for You" stories={topPicks} showTopBadge />
      <StoryRail title="Popular on OUR Stories" stories={popularStories} showCategory />

      {adventureStories.length > 0 && (
        <StoryRail title="Adventure Stories" stories={adventureStories} showCategory />
      )}

      {fantasyStories.length > 0 && (
        <StoryRail title="Fantasy Stories" stories={fantasyStories} showCategory />
      )}

      {magicStories.length > 0 && (
        <StoryRail title="Magic Stories" stories={magicStories} showCategory />
      )}

      {dramaStories.length > 0 && (
        <StoryRail title="Drama Stories" stories={dramaStories} showCategory />
      )}

      {comedyStories.length > 0 && (
        <StoryRail title="Comedy Stories" stories={comedyStories} showCategory />
      )}
    </main>
  )
}

export default HomePage