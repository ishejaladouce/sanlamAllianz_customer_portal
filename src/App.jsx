import { RouterProvider } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { router } from './routes'
import { queryClient } from './lib/queryClient'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme } = useTheme()

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        richColors
        theme={theme}
        toastOptions={{
          style: { fontFamily: 'inherit', borderRadius: 0 },
        }}
      />
    </QueryClientProvider>
  )
}

export default App
