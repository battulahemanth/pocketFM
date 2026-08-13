
import StoryRail from '../../components/StoryRail/StoryRail'
import { stories } from '../../jsonFiles/stories'

import './HomePage.css'

function HomePage() {

  const topPicks = stories

  const popularStories = [...stories].reverse()

  return (
    <main className="pocket-home">

      {/* NAVBAR */}


      {/* TOP PICKS */}

      <StoryRail
        title="Top Picks for Guest"
        stories={topPicks}
        showTopBadge
      />

      {/* POPULAR STORIES */}

      <StoryRail
        title="Popular on OUR Stories"
        stories={popularStories}
        showCategory
      />

      <StoryRail
        title="Top Completed Series"
        stories={topPicks}
        showTopBadge
      />

 <StoryRail
        title="vickream batal stories"
        stories={topPicks}
        showTopBadge
      />

       <StoryRail
        title="moral stories"
        stories={topPicks}
        showTopBadge
      />
       <StoryRail
        title="purna stories"
        stories={topPicks}
        showTopBadge
      />

      

    </main>
  )
}

export default HomePage