import { Play } from "phosphor-react"
import { HomeContainer, CountdownContainer, FormContainer, Separator, StartCountDownButton, TaskInput, MinutesAmountInput } from "./styles"

export const Home = () => {
  return <HomeContainer>
    <form action="">
      <FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput
          type="text"
          id="task"
          placeholder="Dê um nome para o seu projeto"
          list="task-sugestions"
        />
        <datalist id="task-sugestions">
          <option value="Projeto 1"></option>
          <option value="Projeto 2"></option>
          <option value="Projeto 3"></option>
          <option value="Banana"></option>
        </datalist>

        <label htmlFor="minutesAmount">durante</label>
        <MinutesAmountInput
          type="number"
          id="minutesAmount"
          placeholder="00"
          step={5}
          min={5}
          max={60}
        />

        <span>minutos.</span>
      </FormContainer>

      <CountdownContainer>
        <span>0</span>
        <span>0</span>
        <Separator>:</Separator>
        <span>0</span>
        <span>0</span>
      </CountdownContainer>

      <StartCountDownButton type="submit">
        <Play size={24} />
        Começar
      </StartCountDownButton>
    </form>

  </HomeContainer>
}
