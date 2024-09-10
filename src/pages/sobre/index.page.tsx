import { NextPage } from 'next'

import questions from 'data/questions.json'
import { Accordion, SEO } from 'components'

import styles from './styles.module.scss'

const AboutPage: NextPage = () => (
  <section className={styles.container}>
    <SEO
      tabName="Sobre"
      title="Descubra mais sobre o brchallenges"
      description=" O BrChallenges é uma plataforma para desafios de desenvolvimento frontend, onde os usuários podem treinar os seus conhecimentos em programação web, ao melhorar as suas habilidades tecnologias como HTML, CSS, JavaScript e etc."
    />

    <h1>Sobre</h1>

    <div className={styles.description}>
      <p>
        O BrChallenges é uma plataforma para desafios de desenvolvimento
        frontend, onde os usuários podem treinar os seus conhecimentos em
        programação web, ao melhorar as suas habilidades tecnologias como{' '}
        <i>HTML</i>, <i>CSS</i>, <i>JavaScript</i> e etc.
      </p>
      <p>
        Cada desafio é classificado em três níveis de dificuldade: <b>fácil</b>,{' '}
        <b>médio</b> e <b>difícil</b>. Isso permite que os usuários escolham
        desafios que sejam adequados para o seu nível de conhecimento, a fim de
        deixar a participação mais democrática.
      </p>
    </div>

    <h2>Perguntas frequentes</h2>

    <Accordion questions={questions} />
  </section>
)

export default AboutPage
