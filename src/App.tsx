import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Docs from './pages/Docs'
import Overview from './pages/platform/Overview'
import Browse from './pages/platform/Browse'
import ServiceDetail from './pages/ServiceDetail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
        {/* Hidden platform routes for development */}
        <Route path="/v1" element={<Overview />} />
        <Route path="/v1/browse" element={<Browse />} />
        <Route path="/v1/service/:id" element={<ServiceDetail />} />
      </Routes>
    </Router>
  )
}

export default App
