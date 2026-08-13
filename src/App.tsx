import {BrowserRouter,  Routes,  Route,} from 'react-router-dom'

import HomePage from './pages/Home/HomePage'

import StoryDetails from './pages/StoryDetails/StoryDetails'

import EpisodePlayer from './pages/EpisodePlayer/EpisodePlayer'

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

function App() {
  return (

    <BrowserRouter>

    <Navbar />

      <Routes>

        {/* HOME */}

        <Route
          path="/"
          element={<HomePage />}
        />

        {/* STORY DETAILS */}

        <Route
          path="/story/:id"
          element={<StoryDetails />}
        />
      


        {/* Episode Player */}

        <Route
          path="/story/:storyId/episode/:episodeId"
          element={<EpisodePlayer />}
        />


      </Routes>

      <Footer />

    </BrowserRouter>
    
  )
}

export default App