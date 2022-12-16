import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Router from './router/Router'

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <Router />
    </AuthProvider>
  )
}

export default App
