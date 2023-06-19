import {
  createContext,
  useContext,
  useReducer,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { cycleReducer } from '../reducers/cycles/reducer'
import {
  ActionTypes,
  addNewCycleAction,
  finishCycleAction,
  interruptCycleAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

interface CreateNewCycleProps {
  task: string
  minutesAmount: number
}

export interface CycleProps {
  id: string
  task: string
  minutesAmount: number
  createdAt: Date
  interruptedAt?: Date
  finishedAt?: Date
}

interface CycleContextProviderProps {
  children: ReactNode
}

interface CycleContextData {
  cycles: CycleProps[]
  activeCycle: CycleProps | undefined
  activeCycleId: string | null
  amountSecondPassed: number
  markCurrentCycleAsFinished: () => void
  handleAmountSecondPassed: (amountSecondPassed: number) => void
  createNewCycle: (data: CreateNewCycleProps) => void
  interruptCycle: () => void
}

export const CycleContext = createContext({} as CycleContextData)

export const CycleContextProvider = ({
  children,
}: CycleContextProviderProps) => {
  const [cycleState, dispatch] = useReducer(
    cycleReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const stateJSON = localStorage.getItem('@pomodoro:cycles-state-1.0.0')

      if (stateJSON) {
        return JSON.parse(stateJSON)
      }

      return initialState
    },
  )

  const { activeCycleId, cycles } = cycleState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondPassed, setAmountSecondPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.createdAt))
    }

    return 0
  })

  function markCurrentCycleAsFinished() {
    dispatch(finishCycleAction())
  }

  function handleAmountSecondPassed(amountSecondPassed: number) {
    setAmountSecondPassed(amountSecondPassed)
  }

  function createNewCycle(data: CreateNewCycleProps) {
    const newCycle: CycleProps = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      createdAt: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondPassed(0)
  }

  function interruptCycle() {
    dispatch(interruptCycleAction())
    setAmountSecondPassed(0)
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(cycleState)
    localStorage.setItem('@pomodoro:cycles-state-1.0.0', stateJSON)
  }, [cycleState])

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondPassed,
        markCurrentCycleAsFinished,
        handleAmountSecondPassed,
        createNewCycle,
        interruptCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}

export const useCycleContext = () => {
  const context = useContext(CycleContext)
  return context
}
