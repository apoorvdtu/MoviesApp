import React from 'react'
import NavBar from './components/NavBar'
import Banner from './components/Banner'
import Movies from './components/Movies'
import { Routes, Navigate, Route } from 'react-router-dom'
import Favourites from './components/Favourites'
function App() {
  return (
    <div>
      <NavBar></NavBar>

      <Routes>
        <Route exact path='/' element={
          <>
            <Banner></Banner>
            <Movies></Movies>
          </>
        }>

        </Route>
        <Route path='/favourites' element={

          <Favourites></Favourites>

        }></Route>

      </Routes>
    </div >

  )
}

export default App