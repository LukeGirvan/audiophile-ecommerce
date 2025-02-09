import {  useEffect } from 'react'
import './App.css'
import {HashRouter as Router, Route, Routes,useLocation}from 'react-router-dom'
import Products from './pages/products'
import Home from './pages/home'

import ProductDetails from './pages/productdetails'
import Checkout from './pages/checkout'

  



function AppContent() {
  const location = useLocation(); 

  useEffect(() => {
    const navBar = document.querySelector('.navbar') as HTMLElement
    const pWidth = document.querySelector('.p-width') as HTMLElement
    if (location.pathname === '/') {
      pWidth.classList.add('home');
      navBar.classList.add('home');
    }
    if (location.pathname.split('/').indexOf('products') !== -1) {
      pWidth.classList.add('products');
    }
    
    return () => {
      pWidth.classList.remove('home');
    };
  }, [location]);


  





  return (
   
    
      <Routes>
        
     <Route path="/" element={<Home />} />
      <Route path="/products/:key" element={<Products />} />
       <Route path="/product-details/:productType/:key" element={<ProductDetails />} />
       <Route path='/checkout' element={<Checkout/>}/>
      {/* <Route path="/products&key=speakers" element={<Products />} /> */}
     </Routes>
     
  )
}

function App(){
  return(<>
  <Router>
    <AppContent/>
  </Router>
  </>)
}


export default App
