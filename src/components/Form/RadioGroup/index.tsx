import { useController, useFormContext } from 'react-hook-form'

import { ErrorMessage } from 'components/Form'

import styles from './styles.module.scss'

interface RadioGroupProps {
  name: string
  label: string
  options: {
    label: string
    value: string
  }[]
}

export const RadioGroup = ({ name, label, options }: RadioGroupProps) => {
  const { control } = useFormContext()
  const { field } = useController({ name, control })

  return (
    <fieldset className={styles.container}>
      <label>{label}</label>

      <div className={styles.radios}>
        {options.map(option => (
          <div
            key={option.value}
            className={styles.radio}
            aria-checked={field.value === option.value}
          >
            <input
              type="radio"
              id={option.value}
              {...field}
              onChange={() => field.onChange(option.value)}
            />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </div>

      <ErrorMessage name={name} />
    </fieldset>
  )
}
