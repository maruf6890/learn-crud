
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

function App() {

  return (
    <>
     <div className="header-wrap">
        <Header></Header>
     </div>
    <div className="outlet m-auto w-10/12">
      <Outlet></Outlet>
    </div>
     <div className="footer-wrap">
        
        <Footer></Footer>
     </div>
    </>
  )
}

export default App
