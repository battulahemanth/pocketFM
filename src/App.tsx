import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

import HomePage from './pages/Home/HomePage'
import StoryDetails from './pages/StoryDetails/StoryDetails'
import EpisodePlayer from './pages/EpisodePlayer/EpisodePlayer'
import AdminDashboard from './pages/AdminDashboard/AdminDashboard'

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { fetchStories } from './features/stories/storySlice'
import type { AppDispatch } from './app/store'

function AppRoutes() {
  const location = useLocation()

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/story/:id" element={<StoryDetails />} />
      <Route path="/story/:storyId/episode/:episodeId" element={<EpisodePlayer key={location.pathname} />} />
    </Routes>
  )
}

function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    void dispatch(fetchStories())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Navbar onOpenProfile={() => {}} profileName="" />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  )
}

export default App