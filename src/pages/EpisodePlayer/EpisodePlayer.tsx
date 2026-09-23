import { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app/store'
import './EpisodePlayer.css'

function EpisodePlayer() {
  const { storyId, episodeId } = useParams<{
    storyId: string
    episodeId: string
  }>()

  const navigate = useNavigate()
  const stories = useSelector((state: RootState) => state.stories.items)

  const audioRef = useRef<HTMLAudioElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const story = stories.find((item) => item.id === storyId)
  const episode = story?.episodes.find((item) => item.id === episodeId)

  if (!story || !episode) {
    return (
      <main className="episode-player">
        <div className="player-error">
          <h1>Episode Not Found</h1>

          <button type="button" onClick={() => navigate('/')}>
            Go Home
          </button>
        </div>
      </main>
    )
  }

  const currentIndex = story.episodes.findIndex((item) => item.id === episode.id)
  const previousEpisode = story.episodes[currentIndex - 1]
  const nextEpisode = story.episodes[currentIndex + 1]

  const handlePlayPause = async () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      try {
        await audioRef.current.play()
      } catch (error) {
        console.error('Audio could not play:', error)
      }
    }
  }

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return

    setDuration(audioRef.current.duration)
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return

    setCurrentTime(audioRef.current.currentTime)
  }

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(event.target.value)

    if (!audioRef.current) return

    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const formatTime = (time: number) => {
    if (!Number.isFinite(time)) {
      return '00:00'
    }

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  const handlePrevious = () => {
    if (!previousEpisode) return
    if (previousEpisode.locked) return

    navigate(`/story/${story.id}/episode/${previousEpisode.id}`)
  }

  const handleNext = () => {
    if (!nextEpisode) return
    if (nextEpisode.locked) return

    navigate(`/story/${story.id}/episode/${nextEpisode.id}`)
  }

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