import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { RxCross1, RxPencil1, RxPlus } from 'react-icons/rx'

import api from 'service/api'
import { useToast } from 'hooks'
import { zodSolutionSchema, SolutionForm } from 'utils/zod'
import { DEFAULT_SOLUTION, LEVELS_OPTIONS } from 'utils/constants'

import { Input, RadioGroup } from 'components/Form'

import styles from './styles.module.scss'

interface ModalSolutionFormProps {
  challengeId: string
}

export const ModalSolutionForm = ({ challengeId }: ModalSolutionFormProps) => {
  const endpoint = `challenge/${challengeId}/solution`

  const toast = useToast()
  const [open, setOpen] = useState<boolean>(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false)

  const useFormMethods = useForm<SolutionForm>({
    mode: 'all',
    resolver: zodResolver(zodSolutionSchema),
    defaultValues: async () => {
      try {
        const response = await api.get(endpoint)
        setHasSubmitted(true)
        return response.data
      } catch (err) {
        console.log('deu ruim')
        console.log(err)
      }

      return DEFAULT_SOLUTION as SolutionForm
    }
  })

  const onSubmit = async (data: SolutionForm): Promise<void> => {
    try {
      await api.post(endpoint, data)

      const actionType = hasSubmitted ? 'atualizada' : 'salva'
      const description = `Solução ${actionType} com sucesso`

      toast.success('Sucesso', { description })
    } catch (err) {
      console.log(err)

      toast.error('Ops! Tivemos um problema', {
        description: 'Falha ao salvar o sua solução'
      })
    } finally {
      setOpen(false)
    }
  }

  const loadingSubmit = useFormMethods.formState.isSubmitting

  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <Dialog.Trigger className="button">
        {hasSubmitted ? (
          <>
            <RxPencil1 size={14} />
            <span>Editar solução</span>
          </>
        ) : (
          <>
            <RxPlus size={14} />
            <span>Enviar solução</span>
          </>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.container}>
          <header className={styles.header}>
            <div>
              <Dialog.Title>Formulário de solução</Dialog.Title>
              <Dialog.Description>
                Preencha os campos para enviar sua solução
              </Dialog.Description>
            </div>
            <Dialog.DialogClose>
              <RxCross1 />
            </Dialog.DialogClose>
          </header>

          <FormProvider {...useFormMethods}>
            <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>
              <main className={styles.main}>
                <Input
                  type="url"
                  label="Repositório"
                  name="repository_url"
                  placeholder="Link do repositório (ex: github, gitlab, bitbucket, etc...)"
                />

                <Input
                  name="url"
                  type="url"
                  label="Visualização"
                  placeholder="Link para visualizar o projeto"
                />

                <Input
                  label="Post do linkedin (opcional)"
                  name="linkedin_url"
                  placeholder="Link do post sobre a solução do desafio"
                />

                <RadioGroup
                  name="level"
                  label="Selecione a dificuldade"
                  options={LEVELS_OPTIONS}
                />
              </main>

              <footer className={styles.footer}>
                <Dialog.DialogClose className="button secondary">
                  Cancelar
                </Dialog.DialogClose>
                <button
                  type="submit"
                  disabled={loadingSubmit}
                  className={`button ${loadingSubmit ? 'loading' : ''}`}
                >
                  Enviar solução
                </button>
              </footer>
            </form>
          </FormProvider>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
