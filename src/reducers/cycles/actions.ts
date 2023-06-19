import { CycleProps } from '../../contexts/CyclesContext'

export enum ActionTypes {
  ADD_CYCLE = 'ADD_CYCLE',
  FINISH_CYCLE = 'FINISH_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
}

export function addNewCycleAction(newCycle: CycleProps) {
  return {
    type: ActionTypes.ADD_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function finishCycleAction() {
  return { type: ActionTypes.FINISH_CYCLE }
}

export function interruptCycleAction() {
  return { type: ActionTypes.INTERRUPT_CYCLE }
}
