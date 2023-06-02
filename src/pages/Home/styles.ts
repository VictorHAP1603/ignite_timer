import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const Separator = styled.div`
  padding: 2rem 0;
  color: ${(p) => p.theme['green-500']};
  width: 4rem;
  overflow: hidden;

  display: flex;
  justify-content: center;
`

const BaseCountDownButton = styled.button`
  width: 100%;
  border: none;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;

  background-color: ${(p) => p.theme['green-500']};
  color: ${(p) => p.theme['gray-100']};

  transition: background-color 0.2s;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: ${(p) => p.theme['green-700']};
  }
`

export const StartCountDownButton = styled(BaseCountDownButton)`
  background-color: ${(p) => p.theme['green-500']};

  &:not(:disabled):hover {
    background-color: ${(p) => p.theme['green-700']};
  }
`

export const StopCountDownButton = styled(BaseCountDownButton)`
  background-color: ${(p) => p.theme['red-500']};

  &:not(:disabled):hover {
    background-color: ${(p) => p.theme['red-700']};
  }
`
