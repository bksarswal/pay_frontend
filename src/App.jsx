


import './App.css'
import Form from './Form'
import Success from './Success'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Failed from './Failed'
import SendPaymentForm from './Sendpaymentform'

function App() {
  

  return (
    <>

    <BrowserRouter>
    <Routes>
    <Route  path='/'   element={<SendPaymentForm/>}/>
    <Route  path='/getpayment'   element={<Form/>}/>
    <Route  path='/success'   element={<Success/>}/>
    <Route  path='/failed'   element={<Failed/>}/>
    </Routes>
    </BrowserRouter>
    
 

  
    </>
  )
}

export default App
