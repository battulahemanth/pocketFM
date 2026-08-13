import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { stories } from '../../jsonFiles/stories'

import './EpisodePlayer.css'

function EpisodePlayer() {
  const { storyId, episodeId } = useParams<{
    storyId: string
    episodeId: string
  }>()

  const navigate = useNavigate()

  const audioRef = useRef<HTMLAudioElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)

  const [currentTime, setCurrentTime] = useState(0)

  const [duration, setDuration] = useState(0)

  // Find the story
  const story = stories.find(
    (item) => item.id === storyId
  )

  // Find the selected episode
  const episode = story?.episodes.find(
    (item) => item.id === episodeId
  )

  // Story or episode not found
  if (!story || !episode) {
    return (
      <main className="episode-player">
        <div className="player-error">

          <h1>Episode Not Found</h1>

          <button
            type="button"
            onClick={() => navigate('/')}
          >
            Go Home
          </button>

        </div>
      </main>
    )
  }

  // Find current episode number
  const currentIndex =
    story.episodes.findIndex(
      (item) => item.id === episode.id
    )

  // Previous episode
  const previousEpisode =
    story.episodes[currentIndex - 1]

  // Next episode
  const nextEpisode =
    story.episodes[currentIndex + 1]

  // Play / Pause
  const handlePlayPause = async () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      try {
        await audioRef.current.play()
      } catch (error) {
        console.error(
          'Audio could not play:',
          error
        )
      }
    }
  }

  // Audio loaded
  const handleLoadedMetadata = () => {
    if (!audioRef.current) return

    setDuration(
      audioRef.current.duration
    )
  }

  // Audio time update
  const handleTimeUpdate = () => {
    if (!audioRef.current) return

    setCurrentTime(
      audioRef.current.currentTime
    )
  }

  // Audio started
  const handlePlay = () => {
    setIsPlaying(true)
  }

  // Audio paused
  const handlePause = () => {
    setIsPlaying(false)
  }

  // Audio finished
  const handleEnded = () => {
    setIsPlaying(false)
    setCurrentTime(0)
  }

  // Progress bar
  const handleSeek = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTime = Number(
      event.target.value
    )

    if (!audioRef.current) return

    audioRef.current.currentTime =
      newTime

    setCurrentTime(newTime)
  }

  // Convert seconds to 00:00 format
  const formatTime = (
    time: number
  ) => {
    if (!Number.isFinite(time)) {
      return '00:00'
    }

    const minutes = Math.floor(
      time / 60
    )

    const seconds = Math.floor(
      time % 60
    )

    return `${String(minutes).padStart(
      2,
      '0'
    )}:${String(seconds).padStart(
      2,
      '0'
    )}`
  }

  // Previous episode
  const handlePrevious = () => {
    if (!previousEpisode) return

    if (previousEpisode.locked) return

    navigate(
      `/story/${story.id}/episode/${previousEpisode.id}`
    )
  }

  // Next episode
  const handleNext = () => {
    if (!nextEpisode) return

    if (nextEpisode.locked) return

    navigate(
      `/story/${story.id}/episode/${nextEpisode.id}`
    )
  }

  // Reset player when episode changes
  useEffect(() => {
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current.load()
    }
  }, [episode.id])

  return (
    <main className="episode-player">

      {/* Back Button */}

      <button
        type="button"
        className="player-back"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* Player */}

      <section className="player-container">

        {/* Story Cover */}

        <img
          src={story.image}
          alt={story.title}
          className="player-cover"
        />

        {/* Story Name */}

        <p className="player-story">
          {story.title}
        </p>

        {/* Episode Name */}

        <h1 className="player-title">
          {episode.title}
        </h1>

        {/* Author */}

        <p className="player-author">
          By {story.author}
        </p>

        {/* Audio */}

        <audio
          ref={audioRef}
          src={episode.audioUrl}
          preload="metadata"
          onLoadedMetadata={
            handleLoadedMetadata
          }
          onTimeUpdate={
            handleTimeUpdate
          }
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
        />

        {/* Progress */}

        <div className="player-progress">

          <span>
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            step="0.1"
            onChange={handleSeek}
          />

          <span>
            {formatTime(duration)}
          </span>

        </div>

        {/* Buttons */}

        <div className="player-controls">

          {/* Previous */}

          <button
            type="button"
            onClick={handlePrevious}
            disabled={!previousEpisode}
            aria-label="Previous episode"
          >
            ⏮
          </button>

          {/* Play / Pause */}

          <button
            type="button"
            className="main-play-button"
            onClick={handlePlayPause}
            aria-label={
              isPlaying
                ? 'Pause'
                : 'Play'
            }
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>

          {/* Next */}

          <button
            type="button"
            onClick={handleNext}
            disabled={
              !nextEpisode ||
              nextEpisode.locked
            }
            aria-label="Next episode"
          >
            ⏭
          </button>

        </div>

        {/* Episode Number */}

        <div className="player-info">

          <span>
            Episode {currentIndex + 1}
          </span>

          <span>
            {episode.duration}
          </span>

        </div>

      </section>

    </main>
  )
}

export default EpisodePlayer