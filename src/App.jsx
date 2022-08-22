import './css/App.css'
import Nav from './components/Nav/Nav'
import logo from './assets/logo.svg'
import { Routes, Route } from 'react-router-dom'
import { MetaDataChecker, AboutUs, JoinUs, ContactUs, IntegrationDocs } from './components/export'


function App() {

  return (
    <div className="App">
      <div className="logo mg-auto"><img src={logo} alt="CognativeX Logo" /></div>
      <Nav />
      <section className="container">
        <Routes>
          <Route path='./metadatachecker' element= { <MetaDataChecker /> } />
          <Route path='./' element= { <IntegrationDocs /> } />
          {/* <Route path='/JoinUs' element= { <JoinUs /> } />
          <Route path='/AboutUs' element= { <AboutUs /> } />
          <Route path='/ContactUs' element= { <ContactUs /> } /> */}
        </Routes>
      </section>  




    </div>
  )
}

export default App
