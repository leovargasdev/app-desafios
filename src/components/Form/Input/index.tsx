import { ComponentProps } from 'react'
import { useController, useFormContext } from 'react-hook-form'

import { ErrorMessage } from 'components/Form'

import styles from './styles.module.scss'

interface InputProps extends ComponentProps<'input'> {
  name: string
  label: string
}

export const Input = ({ name, label, ...rest }: InputProps) => {
  const { control } = useFormContext()
  const { field, fieldState } = useController({ name, control })

  const error = fieldState.error?.message
  const isError = typeof error === 'string'

  return (
    <fieldset className={styles.input}>
      <label htmlFor={name}>{label}</label>
      <input
        className={isError ? styles.error : ''}
        aria-invalid={isError}
        {...rest}
        {...field}
      />

      <ErrorMessage name={name} />
    </fieldset>
  )
}
