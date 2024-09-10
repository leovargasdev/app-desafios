import { GetStaticProps, NextPage } from 'next'

import { SEO, ChallengeCard } from 'components'
import { createClientPrismic } from 'service/prismic'
import { getListChallenges } from 'utils/format/challenge'

import type { Challenge } from 'types/challenge'
import type { Ordering } from '@prismicio/client'
import MOCK_CHALLENGES from 'mocks/challenges.json'

import styles from 'styles/home.module.scss'

interface PageProps {
  challenges: Challenge[]
}

const HomePage: NextPage<PageProps> = ({ challenges }) => (
  <section className={styles.container}>
    <SEO
      tabName="Listagem dos desafios"
      title="Desafios Front-end: teste suas habilidades e aprenda novas tecnologias"
      description="Melhore suas habilidades em front-end com nossos desafios práticos e aprenda novas tecnologias. Nossa plataforma é perfeita para iniciantes e profissionais experientes. Participe agora e tenha ótimos projetos em seu portfólio!"
    />

    {challenges.map(challenge => (
      <ChallengeCard key={challenge.id} {...challenge} />
    ))}
  </section>
)

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
  if (process.env.VERCEL_ENV !== 'production') {
    return { props: { challenges: MOCK_CHALLENGES }, revalidate: false }
  }

  try {
    const prismic = createClientPrismic({ previewData })

    const orderings: Ordering[] = [
      { field: 'document.first_publication_date', direction: 'desc' }
    ]
    const response = await prismic.getAllByType('challenges', { orderings })

    const challenges = await getListChallenges(response)

    return {
      props: { challenges },
      revalidate: 60 * 60 * 5
    }
  } catch (err) {
    console.log(err)
  }

  return { props: { challenges: [] }, revalidate: false }
}

export default HomePage
