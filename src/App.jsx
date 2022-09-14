import './css/App.css'
import Nav from './components/Nav/Nav'
import logo from './assets/logo.svg'
import { Routes, Route } from 'react-router-dom'
import { Select, Controller, ControllerMultiSelect } from './components/export'


function App() {

  return (
    <div className="App">
      <div className="logo mg-auto"><img src={logo} alt="CognativeX Logo" /></div>
      <Nav />
      <section className="container">
        <Routes>
          <Route active path='/integration/select' element= { <Select /> } />
          <Route active path='/integration/controller' element= { <Controller /> } />
          <Route active path='/integration/multiSelect' element= { <ControllerMultiSelect /> } />
        </Routes>
      </section>  




    </div>
  )
}

export default App
