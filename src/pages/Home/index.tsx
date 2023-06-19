import * as zod from 'zod'
import { HandPalm, Play } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useCycleContext } from '../../contexts/CyclesContext'

// components
import { CountDown } from './components/CountDown'
import { NewCycleForm } from './components/NewCycleForm'

// styles
import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'

const newCycleSchema = zod.object({
  task: zod.string().nonempty('Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo deve ser no mínimo 5 minutos')
    .max(60, 'O ciclo dever ser no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleSchema>

export const Home = () => {
  const { activeCycle, createNewCycle, interruptCycle } = useCycleContext()

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={interruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
