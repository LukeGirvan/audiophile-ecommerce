import { Link } from "react-router-dom";
import '../styles/menusection.scss'
import { useLocation } from "react-router-dom";


function MenuSection(){


    const location = useLocation()



    return(<>
    <div className="menu-section">
            <Link to='/products/headphones' state={{from:location.pathname}} >
            <div className="menu-item">
                <img  alt="image of headphones" className="headphones" />
                <h3>HEADPHONES</h3>
                <div className="shop">SHOP<img 
                 alt="" className="right-arrow" /> </div>
            </div>
            </Link>
            <Link to='/products/speakers'state={{from:location.pathname}} >
            <div className="menu-item">
                <img  alt="image of speakers" className="speakers" />
                <h3>SPEAKERS</h3>
                <div className="shop">SHOP <img 
                 alt="" className="right-arrow" /></div>
            </div>
            </Link>

            <Link to='/products/earphones' state={{from:location.pathname}} >
            <div className="menu-item">
                <img  alt="image of earphones" className="earphones" />
                <h3>EARPHONES</h3>
                <div className="shop">SHOP <img 
                 alt="" className="right-arrow" />
                 </div>


                 
            </div>
            </Link>

           
            </div>
    </>)
}
export  default MenuSection;