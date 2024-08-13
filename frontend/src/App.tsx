import { BrowserRouter, Route , Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './screens/LandingPage'
import Game from './screens/Game'
function App() {
    return (
        <BrowserRouter>
      <Routes>
      <Route path="/" element={<LandingPage />}> 
        </Route> 
        <Route path="/game" element = {<Game/>}> 
        </Route>
      </Routes>
    </BrowserRouter>
    )
}

export default App
