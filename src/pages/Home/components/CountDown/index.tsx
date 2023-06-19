import { useEffect } from 'react'
import { differenceInSeconds } from 'date-fns'
import { useCycleContext } from '../../../../contexts/CyclesContext'

import { CountdownContainer, Separator } from './style'

export const CountDown = () => {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondPassed,
    handleAmountSecondPassed
  } = useCycleContext()

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (!activeCycle) return

    const interval = setInterval(() => {
      const secondsDifference = differenceInSeconds(
        new Date(),
        activeCycle.createdAt,
      )

      if (secondsDifference > totalSeconds) {
        markCurrentCycleAsFinished()
        clearInterval(interval)
        handleAmountSecondPassed(totalSeconds)
      } else {
        handleAmountSecondPassed(secondsDifference)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    handleAmountSecondPassed
  ])

  useEffect(() => {
    if (activeCycle) {
      document.title = `Ignite Timer | ${minutes}:${seconds}`
    } else {
      document.title = 'Ignite Timer'
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
