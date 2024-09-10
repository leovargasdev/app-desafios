import classnames from 'classnames'
import { useRouter } from 'next/router'

import { LayoutHeader } from './Header'
import { LayoutFooter } from './Footer'

import styles from './styles.module.scss'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const { asPath } = useRouter()
  const isLogin = asPath === '/login'

  return (
    <div className={styles.layout}>
      {!isLogin && <LayoutHeader />}

      <main className={classnames(styles.main, isLogin && styles.login)}>
        {children}
      </main>

      {!isLogin && <LayoutFooter />}
    </div>
  )
}
