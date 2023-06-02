import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(p) => p.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: none;
  border-bottom: 2px solid ${(p) => p.theme['gray-500']};
  font-weight: bold;
  font-size: 1.125rem;
  font-size: inherit;
  padding: 0 0.5rem;
  color: ${(p) => p.theme['gray-100']};
  transition: border-color 0.4s;

  &:focus {
    box-shadow: none;
    border-color: ${(p) => p.theme['green-500']};
  }

  &::placeholder {
    color: ${(p) => p.theme['gray-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
