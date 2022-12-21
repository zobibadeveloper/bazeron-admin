import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { OrderProvider } from './context/OrderContext'
import Router from './router/Router'

function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <Router />
      </OrderProvider>
    </AuthProvider>
  )
}

export default App
