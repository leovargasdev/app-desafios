import { PrismicNextImage } from '@prismicio/next'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { SEO } from 'components'
import { Aside } from './_components/Aside'
import { ChallengeInfo } from './_components/ChallengeInfo'

import type { Challenge } from 'types/challenge'
import MOCK_CHALLENGE from 'mocks/challenge.json'

import styles from './styles.module.scss'

const ChallengePage: NextPage<Challenge> = challenge => (
  <>
    <SEO
      tabName={`Desafio ${challenge.name}`}
      title={`Desafio ${challenge.name} do brchallenges`}
      description={challenge.description}
      image={challenge.image.url}
    />

    <picture className={styles.cover}>
      <PrismicNextImage field={challenge.image} />
    </picture>

    <div className={styles.container}>
      <ChallengeInfo {...challenge} />

      <Aside {...challenge} />
    </div>
  </>
)

export const getStaticPaths: GetStaticPaths = async () => {
  return { fallback: 'blocking', paths: [] }
}

export const getStaticProps: GetStaticProps = async props => {
  if (process.env.VERCEL_ENV !== 'production') {
    return { props: MOCK_CHALLENGE, revalidate: false }
  }

  return {
    props: { aaa: 'teste' },
    revalidate: 69
  }
}

export default ChallengePage
