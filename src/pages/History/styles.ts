import styled, { DefaultTheme } from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${p => p.theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;
    border-collapse: collapse;
    min-width: 600px;

    th {
      color: ${p => p.theme['gray-100']};
      background-color: ${p => p.theme['gray-600']};
      text-align: left;

      color: ${p => p.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;
      padding: 1rem;


      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${p => p.theme['gray-700']};
      border-top: 4px solid ${p => p.theme['gray-800']};

      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

const STATUS_COLORS = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500'
} as const

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${p => p.theme[STATUS_COLORS[p.statusColor]]};
  }

  /* &:after {} */
`
