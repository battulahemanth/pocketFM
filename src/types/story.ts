export type Episode = {
  id: string
  title: string
  duration: string
  audioUrl: string
  locked: boolean
}

export type Story = {
  id: string
  title: string
  author: string
  rating: string
  plays: string
  image: string
  category: string
  subcategory: string
  description: string
  episodes: Episode[]
}