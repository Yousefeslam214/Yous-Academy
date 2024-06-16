// import { useState } from 'react'
import './App.css'
import LoginForm from './scene/LoginForm'
import Home from './scene/Home'
import Navbar from './components/Navbar'
import Counter from './components/Counter'



function App() {

  return (
    <>
      <Navbar/>
      <Counter/>

      <h1> hello</h1>
      <LoginForm />
      <Home/>
    </>
  )
}

export default App
