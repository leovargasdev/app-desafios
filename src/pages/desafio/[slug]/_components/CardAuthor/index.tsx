import { ImBehance2 } from 'react-icons/im'
import { PrismicLink } from '@prismicio/react'
import {
  FaLinkedin,
  FaFigma,
  FaDribbble,
  FaLink,
  FaInstagram
} from 'react-icons/fa'
import { PrismicNextImage } from '@prismicio/next'

import type { Author } from 'types/author'

import styles from './styles.module.scss'

const socials = {
  linkedin: { icon: <FaLinkedin />, label: 'Linkedin' },
  dribbble: { icon: <FaDribbble />, label: 'Dribbble' },
  behance: { icon: <ImBehance2 />, label: 'Behance' },
  figma: { icon: <FaFigma />, label: 'Figma' },
  instagram: { icon: <FaInstagram />, label: 'Instagram' },
  website: { icon: <FaLink />, label: 'Website' }
}

export const CardAuthor = (author: Author) => (
  <div className={styles.author}>
    <div className={styles.author__image}>
      <PrismicNextImage field={author.image} />
    </div>

    <div className={styles.author__info}>
      <h3>{author.name}</h3>

      <p>{author.description}</p>

      <hr />

      <ul className={styles.author__links}>
        {author.links.map(link => (
          <li key={link.type}>
            <PrismicLink field={link.link}>
              {socials[link.type].icon} {socials[link.type].label}
            </PrismicLink>
          </li>
        ))}
      </ul>
    </div>
  </div>
)
