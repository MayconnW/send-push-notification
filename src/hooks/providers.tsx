import { ReactNode } from 'react'
import { ChakraProvider, ThemeConfig } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { ConfProvider } from './use-conf'
import { SessionProvider } from './use-session'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ config,  })

export const Providers = ({ children }: { children: ReactNode }) => {

  return (
    <ChakraProvider theme={theme}>
      <SessionProvider>
        <ConfProvider>
          {children}
        </ConfProvider>
      </SessionProvider>
    </ChakraProvider>
  );
}
