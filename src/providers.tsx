import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type React from 'react'

const queryClient = new QueryClient()

export function Providers({ children }: Providers.Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export namespace Providers {
  export type Props = {
    children: React.ReactNode
  }
}
