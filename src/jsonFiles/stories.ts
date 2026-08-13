import type { Story } from '../types/story'
const story1 = '/images/story1.png'
const story2= '/images/story2.png'
const story3= '/images/story3.png'

export const stories: Story[] = [
  {
    id: '1',
    title: 'Kesi Krishna',
    author: 'Hemanth',
    rating: '4.8',
    plays: '1.2M',
    image: story1,
    category: 'Fantasy',
    subcategory: 'Adventure',
    description:
      'A mysterious magical journey begins when Krishna discovers a hidden power connected to an ancient secret.',
    episodes: [
      {
        id: 'ep1',
        title: 'The Mysterious Beginning',
        duration: '18:25',
        audioUrl: '/audio/story1.mp3',
        locked: false,
      },
      {
        id: 'ep2',
        title: 'The Mystical Power',
        duration: '21:10',
        audioUrl: '/audio/story2.mp3',
        locked: false,
      },
      {
        id: 'ep3',
        title: 'The Secret Temple',
        duration: '19:45',
        audioUrl: '/audio/story3.mp3',
        locked: false,
      },
      {
        id: 'ep4',
        title: 'The Ancient Ring',
        duration: '22:30',
        audioUrl: '/audio/episode-4.mp3',
        locked: true,
      },
      {
        id: 'ep5',
        title: 'The First Challenge',
        duration: '25:15',
        audioUrl: '/audio/episode-5.mp3',
        locked: true,
      },
    ],
  },

  {
    id: '2',
    title: 'The Magical Ring',
    author: 'Hemanth',
    rating: '4.7',
    plays: '980K',
    image: story2,
    category: 'Fantasy',
    subcategory: 'Magic',
    description:
      'An ancient ring holds a mysterious power that changes everything.',
    episodes: [
      {
        id: 'ep6',
        title: 'The Ancient Secret',
        duration: '20:10',
        audioUrl: '/audio/episode-6.mp3',
        locked: false,
      },
      {
        id: 'ep7',
        title: 'The Hidden Power',
        duration: '23:20',
        audioUrl: '/audio/episode-7.mp3',
        locked: true,
      },
    ],
  },

  {
    id: '3',
    title: 'Forest Mystery',
    author: 'Hemanth',
    rating: '4.6',
    plays: '750K',
    image: story3,
    category: 'drama',
    subcategory: 'comady',
    description:
      'A group of friends enter a mysterious forest and discover something unexpected.',
    episodes: [
      {
        id: 'ep8',
        title: 'Into the Forest',
        duration: '17:30',
        audioUrl: '/audio/episode-8.mp3',
        locked: false,
      },
      {
        id: 'ep9',
        title: 'The Dark Path',
        duration: '20:45',
        audioUrl: '/audio/episode-9.mp3',
        locked: true,
      },
    ],
  },
]