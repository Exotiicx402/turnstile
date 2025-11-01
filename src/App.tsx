import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Docs from './pages/Docs'
import Marketplace from './pages/Marketplace'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
        {/* Hidden platform route for development */}
        <Route path="/v1" element={<Marketplace />} />
      </Routes>
    </Router>
  )
}

export default App
