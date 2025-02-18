import { useState } from 'react'
import { Button } from "./components/ui/button";
import Hero from './components/custom/Hero';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Hero/>
    </>
  )
}

export default App
