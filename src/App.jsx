import './css/App.css'
import Nav from './components/Nav/Nav'
import logo from './assets/logo.svg'
import { Routes, Route } from 'react-router-dom'
import { Select, Controller, ControllerMultiSelect, SelectWPills, AdvancedSelect, TreeSelect } from './components'


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
          <Route active path='/integration/SelectWPills' element= { <SelectWPills /> } />
          <Route active path='/integration/AdvancedSelect' element= { <AdvancedSelect /> } />
          <Route active path='/integration/TreeSelect' element= { <TreeSelect /> } />
        </Routes>
      </section>  




    </div>
  )
}

export default App
