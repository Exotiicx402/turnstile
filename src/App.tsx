import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { WalletContextProvider } from './components/WalletProvider'
import Home from './pages/Home'
import Docs from './pages/Docs'
import Leaderboard from './pages/Leaderboard'
import Marketplace from './pages/Marketplace'

function App() {
  return (
    <WalletContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          {/* Hidden platform route for development */}
          <Route path="/v1" element={<Marketplace />} />
        </Routes>
      </Router>
    </WalletContextProvider>
  )
}

export default App
