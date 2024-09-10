import { ImageFieldImage, FilledLinkToWebField } from '@prismicio/types'

type SocialType =
  | 'linkedin'
  | 'dribbble'
  | 'behance'
  | 'figma'
  | 'instagram'
  | 'website'

export interface LinkAuthor {
  type: SocialType
  link: FilledLinkToWebField
}

export interface Author {
  name: string
  description: string
  image: ImageFieldImage
  links: LinkAuthor[]
}
