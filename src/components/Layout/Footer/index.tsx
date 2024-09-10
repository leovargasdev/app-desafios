import styles from './styles.module.scss'

export const LayoutFooter = () => (
  <footer className={styles.footer}>
    <div>
      <span>&#169; BrChallenges {new Date().getFullYear()}</span>

      <p>
        Idealizado por{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.leonardovargas.dev/"
        >
          Leo Vargas ✌
        </a>
      </p>
    </div>
  </footer>
)
