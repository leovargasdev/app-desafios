import Link from 'next/link'
import { useState } from 'react'
import classNames from 'classnames'
import { useSession, signOut } from 'next-auth/react'

import { Logo } from 'components/SVG'
import { AvatarDropdownMenu } from './AvatarDropdownMenu'

import styles from './styles.module.scss'

export const LayoutHeader = () => {
  const { status } = useSession()
  const [activeMenuMobile, setActiveMenuMobile] = useState<boolean>(false)

  const handleSignOut = () => {
    signOut()
    setActiveMenuMobile(false)
  }

  return (
    <header className={styles.header}>
      <nav className={styles.header__content}>
        <Link
          href="/"
          className={styles.header__logo}
          aria-label="Link para a página inicial do brchallenges"
        >
          <Logo />
        </Link>

        <ul
          className={classNames(
            styles.header__navigation,
            activeMenuMobile && styles.active
          )}
        >
          <li>
            <Link href="/">Página inicial</Link>
          </li>
          <li>
            <a
              href="https://discord.gg/JPS2bY6GVy"
              target="_blank"
              rel="noreferrer"
            >
              Comunidade
            </a>
          </li>
          <li>
            <Link href="/sobre">Sobre</Link>
          </li>

          {status === 'authenticated' ? (
            <li>
              <button className="button" onClick={handleSignOut}>
                Sair
              </button>
            </li>
          ) : (
            <li>
              <Link href="/login" className="button">
                Acessar conta
              </Link>
            </li>
          )}
        </ul>

        <AvatarDropdownMenu />

        <button
          type="button"
          className={styles.button__toggle}
          aria-expanded={activeMenuMobile}
          onClick={() => setActiveMenuMobile(state => !state)}
          aria-label="Botão para abrir/fechar o menu mobile"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </header>
  )
}
