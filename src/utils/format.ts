import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

const dateFnsOptions = { locale: ptBR }

export const formatDate = (value: string, formatString: string): string => {
  if (!value) {
    return ''
  }

  const date = new Date(value)
  return format(date, formatString, dateFnsOptions)
}
