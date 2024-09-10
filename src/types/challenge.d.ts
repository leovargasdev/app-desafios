import type { ImageFieldImage, RichTextField } from '@prismicio/types'

import type { Author } from './author'

export interface Challenge {
  id: string
  name: string
  deadline: string
  image: ImageFieldImage
  authors: Author[]
  content: RichTextField
  prototype_url: string
  description: string
  participants: number
  users: string[]
}

export interface ChallengeMongo {
  participants: number
  challenge_id: string
}
