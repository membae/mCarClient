import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Auth from './components/Auth'
import './index.css'
import Adminedits from './components/Adminedits'
import Navbar from './components/Navbar'
import FindMechanic from './components/FindMechanic'


function App() {
  return (
    <Routes>
      <Route path='/auth' element={<Auth/>}></Route>
      <Route path='/navbar' element={<Navbar/>}></Route>
      <Route path='/adminedits' element={<Adminedits/>}></Route>
      <Route path='findmechanic' element={<FindMechanic/>}></Route>
    </Routes>

    )
}

export default App
