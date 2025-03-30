import { RouterProvider } from 'react-router-dom'
import './App.css'
import { myRouter } from './components/router-components/Router'
import Footer from './components/homePage/Footer'

function App() {

  return (
    
    <>
    
      <RouterProvider router={myRouter} />
      <Footer/>
    </>
  )
}

export default App

