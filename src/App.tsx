import './App.scss'
import { useState } from 'react'
import { phonesData } from './data/phones'
import { Header } from './components/page/Header/Header'
import { Main } from './components/page/Main/Main'
import { Footer } from './components/page/Footer/Footer'

function App() {
  const [phones, setPhones] = useState(phonesData)

  return (
    <div className='app' data-testid='page-1'>
      <Header phones={phones} setPhones={setPhones} />
      <Main phones={phones} setPhones={setPhones} />
      <Footer />
    </div>
  )
}

export default App
