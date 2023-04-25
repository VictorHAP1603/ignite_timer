import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus {
        outline: 0;
        box-shadow: 0 0 0 2px ${({ theme }) => theme['green-500']};
    }

    html {
        font-size: 62.5%;
    }

    body {
        background-color: ${(p) => p.theme['gray-900']};
        color: ${(p) => p.theme['gray-300']};
    }

    body, input, textarea, button {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }
`
