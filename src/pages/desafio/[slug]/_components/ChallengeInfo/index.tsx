import { RxCalendar } from 'react-icons/rx'
import { PrismicRichText } from '@prismicio/react'

import { formatDate } from 'utils/format'
import { CardAuthor } from '../CardAuthor'
import type { Challenge } from 'types/challenge'

import styles from './styles.module.scss'

export const ChallengeInfo = (challenge: Challenge) => (
  <div className={styles.challenge}>
    <section>
      <h1>{challenge.name}</h1>
      <div className={styles.challenge__date}>
        <RxCalendar size={16} />
        <p>
          Publicado em{' '}
          <time dateTime={challenge.deadline}>
            {formatDate(challenge.deadline, 'dd/MM/yyyy')}
          </time>
        </p>
      </div>
    </section>

    <section>
      <h2>Autor do layout</h2>
      <a href="#authors">
        {challenge.authors.map(author => author.name).join(',')}
      </a>
    </section>

    <section>
      <h2>Descrição</h2>
      <div className={styles.challenge__description}>
        <PrismicRichText field={challenge.content} />
      </div>
    </section>

    <section>
      <h2>Preview do layout</h2>
      <iframe
        allowFullScreen
        className={styles.challenge__layout}
        src={`https://www.figma.com/embed?embed_host=astra&url=${challenge.prototype_url}`}
      />
    </section>

    <section id="authors">
      {challenge.authors.map(author => (
        <CardAuthor key={author.name} {...author} />
      ))}
    </section>
  </div>
)
