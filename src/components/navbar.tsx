import logo from '../assets/shared/desktop/logo.svg'
import '../styles/navbar.scss'
import cart from '../assets/shared/desktop/icon-cart.svg'
import hamburger from '../assets/shared/tablet/icon-hamburger.svg'
import { Link, useLocation } from 'react-router-dom'
import {  useEffect, useState } from 'react'
import { useCart } from '../hooks/useCart'
import Cart from './cart'
import MobileMenu from './mobilemenu'


function Navbar(){

    const [menuShown, setMenuShown] = useState(false);
    const {showCart, getTotalQuantity } = useCart()
    const location = useLocation()
    const quantity = getTotalQuantity()

    const showMobileMenu = () => {
    
        if(menuShown && document.body.classList.contains('scroll-lock')){
            document.body.classList.remove('scroll-lock')
        }
        if(!menuShown && !document.body.classList.contains('scroll-lock')){
            document.body.classList.toggle('scroll-lock')
        }
        console.log(!menuShown && !document.body.classList.contains('scroll-lock'))
        setMenuShown(!menuShown)
    }

    useEffect(() => {
        document.body.classList.remove('scroll-lock')
        setMenuShown(false)
        const splitPathName = location.pathname.split('/')
        const headphonesNavBarLink = document.querySelector('.headphones-nav-link') as HTMLAnchorElement
        const earphonesNavBarLink = document.querySelector('.earphones-nav-link') as HTMLAnchorElement
        const speakersNavBarLink = document.querySelector('.speakers-nav-link') as HTMLAnchorElement





        if(splitPathName[splitPathName.length-1]==='headphones'){
            headphonesNavBarLink?.classList.add('selected')
        }
        
        if(splitPathName[splitPathName.length-1]=== 'earphones'){
            earphonesNavBarLink?.classList.add('selected')
        }
        if(splitPathName[splitPathName.length-1]=== 'speakers'){
            speakersNavBarLink?.classList.add('selected')
        }
        if(splitPathName[splitPathName.length-1]!=='headphones' && headphonesNavBarLink.classList.contains('selected') ){
            headphonesNavBarLink?.classList.remove('selected')
        }
        
        if(splitPathName[splitPathName.length-1]!=='earphones' && earphonesNavBarLink.classList.contains('selected') ){
            headphonesNavBarLink?.classList.remove('selected')
        }


        if(splitPathName[splitPathName.length-1]!=='speakers' && speakersNavBarLink.classList.contains('selected') ){
            speakersNavBarLink?.classList.remove('selected')
        }


    },[location]) 

    
    
   return(
    <>
    <Cart />
    <nav className="navbar">
        <div className="p-width">
            <div className="img-holder">
            <img src={hamburger} alt="hamburger menu icon" className='hamburger' onClick={showMobileMenu} />

            </div>
            <div className="logo-holder">
            <Link to='/' state={{from: location.pathname}}>
                <img src={logo} alt="link to homepage" />
                </Link>
            </div>
                <ul className='nav-list'>
                <li><Link to='/' state={{from: location.pathname}}className='home-nav-link'>HOME</Link></li>
                    <li><Link to='/products/earphones' state={{from: location.pathname}} className='earphones-nav-link'>EARPHONES</Link></li>
                    <li><Link to='/products/headphones' state={{from: location.pathname}}className='headphones-nav-link'>HEADPHONES</Link></li>
                    <li><Link to='/products/speakers' state={{from: location.pathname}}className='speakers-nav-link'>SPEAKERS</Link></li>
                </ul>
                <div className="cart-holder">
                    <span className="cart-logo" onClick={showCart}>
                    <img src={
                        cart} alt="image of cart" />
                    </span>

                        <span className={`red ${quantity <= 0 ? 'hide':''} `}>
                            {quantity}
                        </span>
                </div>
        </div>
    </nav>
    <MobileMenu display={menuShown}/>
    </>
   )
}
export  default Navbar