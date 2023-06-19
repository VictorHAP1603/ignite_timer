import { createContext, useContext, useReducer, useState } from "react";

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

interface CycleContextProvider {
  children: React.ReactNode
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
}'  '

interface CycleState {
  cycles: CycleProps[]
  activeCycleId: string | null
}

export const CycleContext = createContext({} as CycleContextData)

export const CycleContextProvider = ({ children }: CycleContextProvider) => {
  // const [cycles, setCycles] = useState<CycleProps[]>([])
  const [amountSecondPassed, setAmountSecondPassed] = useState(0)
  const [cycleState, dispatch] = useReducer((state: CycleState, action: any) => {
    if (action.type === 'ADD_CYCLE') {
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id
      }
    }

    if (action.type === 'FINISH_CYCLE') {
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === action.payload.activeCycleId) {
            return {
              ...cycle,
              finishedAt: new Date(),
            }
          }

          return cycle
        }),
        activeCycleId: null
      }
    }

    if (action.type === 'INTERRUPT_CYCLE') {
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === action.payload.activeCycleId) {
            return {
              ...cycle,
              interruptedAt: new Date(),
            }
          }

          return cycle
        }),
        activeCycleId: null
      }
    }

    return state
  }, {
    cycles: [],
    activeCycleId: null
  })

  const { activeCycleId, cycles } = cycleState


  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'FINISH_CYCLE',
      payload: {
        activeCycleId
      }
    })
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

    dispatch({
      type: 'ADD_CYCLE',
      payload: {
        newCycle
      }
    })

    setAmountSecondPassed(0)
  }

  function interruptCycle() {

    dispatch({
      type: 'INTERRUPT_CYCLE',
      payload: {
        activeCycleId
      }
    })

    setAmountSecondPassed(0)
  }

  return (
    <CycleContext.Provider value={{
      cycles,
      activeCycle,
      activeCycleId,
      amountSecondPassed,
      markCurrentCycleAsFinished,
      handleAmountSecondPassed,
      createNewCycle,
      interruptCycle
    }}>
      {children}
    </CycleContext.Provider>
  )
}

export const useCycleContext = () => {
  const context = useContext(CycleContext)
  return context
}
