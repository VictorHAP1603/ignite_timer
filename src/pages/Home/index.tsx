import { useEffect, useState } from 'react'
import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { differenceInSeconds } from 'date-fns'

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { CountDown } from './components/CountDown'

const newCycleSchema = zod.object({
  task: zod.string().nonempty('Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo deve ser no mínimo 5 minutos')
    .max(60, 'O ciclo dever ser no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  createdAt: Date
  interruptedAt?: Date
  finishedAt?: Date
}

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondPassed, setAmountSecondPassed] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    // formState: { errors },
  } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const task = watch('task')
  const isSubmitDisabled = !task

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      createdAt: new Date(),
    }

    setCycles((oldCycles) => [...oldCycles, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondPassed(0)

    reset()
  }

  function handleInterruptCycle() {
    setCycles((oldCycles) =>
      oldCycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interruptedAt: new Date(),
          }
        }

        return cycle
      }),
    )

    setActiveCycleId(null)
    setAmountSecondPassed(0)
  }

  useEffect(() => {
    if (!activeCycle) return

    let cycleIsFinished = false

    const interval = setInterval(() => {
      const secondsDifference = differenceInSeconds(
        new Date(),
        activeCycle.createdAt,
      )

      if (secondsDifference > totalSeconds) {
        setCycles((oldCycles) =>
          oldCycles.map((cycle) => {
            if (cycle.id === activeCycleId) {
              return {
                ...cycle,
                finishedAt: new Date(),
              }
            }

            return cycle
          }),
        )

        cycleIsFinished = true
        console.log('Ciclo finalizado')
        // clearInterval(interval)
        // setActiveCycleId(null)
      } else {
        setAmountSecondPassed(secondsDifference)
      }
    }, 1000)

    if (cycleIsFinished) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [activeCycle, totalSeconds, activeCycleId])

  useEffect(() => {
    if (activeCycle) {
      document.title = `Ignite Timer | ${minutes}:${seconds}`
    } else {
      document.title = 'Ignite Timer'
    }
  }, [minutes, seconds, activeCycle])

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <NewCycleForm />
        <CountDown />

        {activeCycle ? (
          <StopCountDownButton type="button" onClick={handleInterruptCycle}>
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
