import chroma from 'chroma-js'
import { GetServerSideProps } from 'next'
import { signIn, getSession } from 'next-auth/react'

import { SEO } from 'components'
import { IconGoogle, IconGitHub } from 'components/SVG'

import styles from './styles.module.scss'

const glowStart = '#6e56cf'
const glowEnd = '#d6409f'

const LoginPage = () => {
  const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    button.style.setProperty('--x', `${x}px`)
    button.style.setProperty('--y', `${y}px`)

    button.style.setProperty(
      '--glow',
      chroma.mix(glowStart, glowEnd, x / rect.width).hex()
    )
  }

  return (
    <>
      <SEO
        tabName="Acessar conta"
        title="Entrar na plataforma de Desafios BRChallenges"
        description="Acesse sua conta e comece a participar dos nossos desafios front-end. Teste suas habilidades, aprenda novas tecnologias e cresça em sua carreira de desenvolvimento web"
      />

      <div className={styles.container}>
        <main className={styles.main}>
          <h1>Aprimore as suas habilidades ao codificar os nossos desafios.</h1>
          <p>Faça login e comece agora.</p>

          <button
            className={styles.button}
            onClick={() => signIn('google')}
            onPointerMove={onPointerMove}
          >
            <IconGoogle />
            <span>Entrar com Google</span>
          </button>
          <button
            className={styles.button}
            onClick={() => signIn('github')}
            onPointerMove={onPointerMove}
          >
            <IconGitHub />
            <span>Entrar com GitHub</span>
          </button>
        </main>
      </div>

      <footer className={styles.footer}>
        <p>
          Desenvolvido por{' '}
          <a
            href="https://www.leonardovargas.dev/"
            target="_blank"
            rel="noreferrer"
          >
            Leonardo Vargas
          </a>
        </p>
      </footer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (session === null) {
    return { props: {} }
  }

  return {
    props: {},
    redirect: {
      destination: '/',
      permanent: false
    }
  }
}

export default LoginPage
