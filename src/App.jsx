import React from 'react'
import { Navbar } from '@material-tailwind/react'
import Navlist from '../src/components/Navbar'
import Hero from './components/Hero'

document.title = "Aboki Xchange"
const App = () => {
  return (
    <>
    <Navbar>
      <Navlist />
    </Navbar>
    <Hero />
    </>
  )
}

export default App