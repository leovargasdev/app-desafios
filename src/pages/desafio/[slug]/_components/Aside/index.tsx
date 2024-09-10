import Link from 'next/link'
import { RxPerson, RxPlus } from 'react-icons/rx'
import { IoTicketSharp } from 'react-icons/io5'

import { SocialShare } from '../SocialShare'
import { ModalSolutionForm } from 'components'
import type { Challenge } from 'types/challenge'

import styles from './styles.module.scss'

export const Aside = (challenge: Challenge) => {
  const isParticipant = true

  return (
    <aside className={styles.container}>
      <SocialShare
        url={'https://www.brchallenges.com/desafio/' + challenge.id}
      />

      {isParticipant ? (
        <>
          <div className={styles.participant__button}>
            <span>
              <IoTicketSharp size={20} color="var(--text)" />
            </span>
            <strong>Participando</strong>
          </div>

          <ModalSolutionForm challengeId={challenge.id} />
        </>
      ) : (
        <button className="button" type="button">
          <RxPlus size={14} />
          Quero participar
        </button>
      )}

      <Link
        className="button secondary"
        href={`/desafio/${challenge.id}/participantes`}
      >
        <RxPerson size={14} />
        Ver participantes
      </Link>
    </aside>
  )
}
