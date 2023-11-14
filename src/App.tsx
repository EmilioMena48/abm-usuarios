//import { useState } from 'react'
import FooterHome from "./components/FooterHome/FooterHome";
import Header from "./components/Header/Header"
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";



function App() {
 // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Header/>
        <AppRoutes/>
       <FooterHome/>
     </Router>
     </>
  )
}

export default App
