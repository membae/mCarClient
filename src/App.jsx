import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Auth from './components/Auth'
import './index.css'
import Adminedits from './components/Adminedits'


function App() {
  return (
    <Routes>
      <Route path='/auth' element={<Auth/>}></Route>
      <Route path='/adminedits' element={<Adminedits/>}></Route>
    </Routes>

    )
}

export default App
