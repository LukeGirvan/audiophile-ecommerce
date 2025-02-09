import logo from '../assets/shared/desktop/logo.svg'
import '../styles/footer.scss'
import { Link} from 'react-router-dom'
import twitterLogo from "../assets/shared/desktop/icon-twitter.svg"
import facebookLogo from "../assets/shared/desktop/icon-facebook.svg"
import instaLogo from "../assets/shared/desktop/icon-instagram.svg"

function Footer(){
    return(<>
    <footer>
        <div className="nav-holder">
            <div className="logo-holder">
            <Link to='/' state={{from: location.pathname}}>
            <img src={logo} alt="" /></Link>
            
            </div>
            <ul className='nav-list'>
                <li><Link to='/'>HOME</Link></li>
                <li><Link to='/products/earphones' state={{from: location.pathname}}>EARPHONES</Link></li>
            <li><Link to='/products/headphones' state={{from: location.pathname}}>HEADPHONES</Link></li>
            <li><Link to='/products/speakers' state={{from: location.pathname}}>SPEAKERS</Link></li>
                </ul>
        </div>
        <div className="second-div">
            <div className="text-holder">
            <p className='bio'>{"Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week."}</p>
            <p className='copyright'>Copyright 2021. All Rights Reserved</p>
            </div>
            <div className="socials">
        <img src={facebookLogo} alt="facebook logo" />
            <img src={twitterLogo} alt="twitter logo" />
            <img src={instaLogo} alt="instagram logo" />
            
        </div>
        </div>
        
    </footer>
    </>)
}
export default Footer;