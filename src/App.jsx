import './App.css'
import Home from './Components/Home'
import Update from './Components/Update'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {


  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/update/:id" element={<Update/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
