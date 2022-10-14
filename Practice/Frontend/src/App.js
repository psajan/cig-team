import React from 'react'
import { Route } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar";
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
const App = () => {
  return (
    <>
      <Navbar />
      <Route exact path='/'>
        <Home />
      </Route>

      <Route path='/About'>
        <About />
      </Route>

      <Route path='/Contact'>
        <Contact />
      </Route>

      <Route path='/Login'>
        <Login />
      </Route>

      <Route path='/Register'>
        <Register />
      </Route>
    </>
  )
}

export default App
