import './App.css'
import Router from './components/Router/Router'
import { AuthProvider } from './providers/auth'
import { ToastProvider } from 'react-toast-notifications'

function App() {

  return (
    <ToastProvider autoDismissTimeout={3000} placement="top-center">
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ToastProvider>
  )
}

export default App
