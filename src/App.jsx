import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Auth from './components/Auth'
import './index.css'


function App() {
  return (
    <Routes>
      <Route path='/auth' element={<Auth/>}></Route>
    </Routes>

    )
}

export default App
