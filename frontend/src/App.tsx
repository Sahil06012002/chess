import { BrowserRouter, Route , Routes } from 'react-router-dom'
import './App.css'
import ChessBoard from './components/ChessBoard'
import Home from './components/Home'
function App() {
    return (
        <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />}> 
        </Route> 
        <Route path="/game" element = {<ChessBoard/>}> 
        </Route>
      </Routes>
    </BrowserRouter>
    )
}

export default App
