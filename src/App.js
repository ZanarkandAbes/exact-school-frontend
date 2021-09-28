import './App.css'
import Router from './components/Router/Router'
import { AuthProvider } from './providers/auth'

function App() {

  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App
