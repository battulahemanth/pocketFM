import { useSelector } from 'react-redux'

import StoryRail from '../../components/StoryRail/StoryRail'
import type { RootState } from '../../app/store'

import './HomePage.css'

function HomePage() {
  const { items: stories, status, error } = useSelector(
    (state: RootState) => state.stories,
  )

  if (status === 'loading' || status === 'idle') {
    return <main className="pocket-home">Loading stories...</main>
  }

  if (status === 'failed') {
    return <main className="pocket-home">{error}</main>
  }

  const topPicks = [...stories].sort(
    (a, b) => Number(b.rating) - Number(a.rating)
  )

  const getPlayCount = (plays: number): number => {
    return plays
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