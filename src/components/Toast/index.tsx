import { FiX } from 'react-icons/fi'
import * as ToastPrimitive from '@radix-ui/react-toast'
import React, { useImperativeHandle, useState } from 'react'

import toastIcons from './icons'

import styles from './styles.module.scss'

type ToastStatus = keyof typeof toastIcons

interface ToastOptions {
  id: string
  status: ToastStatus
  title: string
  duration?: number
  description?: string
  type?: ToastPrimitive.ToastProps['type']
}

type TitleOrOptions =
  | ToastOptions['title']
  | Omit<ToastOptions, 'id' | 'status'>

type DescriptionOrOptions =
  | ToastOptions['description']
  | Omit<ToastOptions, 'id' | 'status' | 'title'>

export type ToastTypeFn = (
  titleOroptions: TitleOrOptions,
  descriptionOrOptions?: DescriptionOrOptions,
  options?: Omit<ToastOptions, 'id' | 'status' | 'title' | 'description'>
) => void

export const ToastViewport = () => (
  <ToastPrimitive.Viewport className={styles.toast__viewport} />
)

export const Toast = React.forwardRef((props, forwardedRef) => {
  const [toasts, setToasts] = useState<Array<ToastOptions>>([])

  function addToast(options: Omit<ToastOptions, 'id'>) {
    const id = Math.random().toString(32).slice(-6)
    setToasts(currentToasts => [...currentToasts, { id, ...options }])
  }

  function createHandler(status: ToastOptions['status']): ToastTypeFn {
    return (titleOrOptions, descriptionOrOptions, options) => {
      if (typeof titleOrOptions !== 'string') {
        return addToast({ ...titleOrOptions, status })
      }

      if (typeof descriptionOrOptions === 'string') {
        return addToast({
          ...options,
          title: titleOrOptions,
          description: descriptionOrOptions,
          status
        })
      }

      return addToast({
        ...descriptionOrOptions,
        title: titleOrOptions,
        status
      })
    }
  }

  useImperativeHandle(forwardedRef, () => ({
    success: createHandler('success'),
    error: createHandler('error')
  }))

  return (
    <>
      {toasts.map(toast => (
        <ToastPrimitive.Root
          className={styles.toast__root}
          key={toast.id}
          duration={toast.duration}
          type={toast.type}
          onOpenChange={open => {
            setTimeout(() => {
              if (!open) {
                setToasts(toasts => toasts.filter(t => t.id !== toast.id))
              }
            }, 100)
          }}
          {...props}
        >
          {toastIcons[toast.status]}

          <ToastPrimitive.Title className={styles.toast__title}>
            {toast.title}
          </ToastPrimitive.Title>

          {!!toast.description && (
            <ToastPrimitive.Description className={styles.toast__description}>
              {toast.description}
            </ToastPrimitive.Description>
          )}

          <ToastPrimitive.Close className={styles.toast__close}>
            <FiX />
          </ToastPrimitive.Close>
        </ToastPrimitive.Root>
      ))}
    </>
  )
})

Toast.displayName = 'ToastComponent'
