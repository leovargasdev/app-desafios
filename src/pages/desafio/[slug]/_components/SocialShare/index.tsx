import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon
} from 'next-share'

import styles from './styles.module.scss'

interface SocialShareProps {
  url: string
}

export const SocialShare = ({ url }: SocialShareProps) => (
  <div className={styles.container}>
    <p>Compartilhe em:</p>

    <div>
      <FacebookShareButton url={url}>
        <FacebookIcon size={24} borderRadius={10} />
      </FacebookShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon size={24} borderRadius={10} />
      </WhatsappShareButton>
      <TelegramShareButton url={url}>
        <TelegramIcon size={24} borderRadius={10} />
      </TelegramShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={24} borderRadius={10} />
      </TwitterShareButton>
      <EmailShareButton url={url}>
        <EmailIcon size={24} borderRadius={10} />
      </EmailShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={24} borderRadius={10} />
      </LinkedinShareButton>
    </div>
  </div>
)
