import headPhoneImg from '/assets/shared/desktop/image-headphones.png'
import earPhoneImg from '/assets/shared/desktop/image-earphones.png'
import speakerImg from '/assets/shared/desktop/image-speakers.png'
import iconRightArrow from '/assets/shared/desktop/icon-arrow-right.svg'
import { Link } from "react-router-dom";
import '../styles/menusection.scss'
import { useLocation } from "react-router-dom";


function MenuSection(){


    const location = useLocation()
    



    return(<>
    <div className="menu-section">
            <Link to='/products/headphones' state={{from:location.pathname}} >
            <div className="menu-item">
                <img  alt="image of headphones" className="headphones" src={headPhoneImg}/>
                <h3>HEADPHONES</h3>
                <div className="shop">SHOP<img 
                 alt="" className="right-arrow" src={iconRightArrow} /> </div>
            </div>
            </Link>
            <Link to='/products/speakers'state={{from:location.pathname}} >
            <div className="menu-item">
                <img  alt="image of speakers" className="speakers" src={speakerImg} />
                <h3>SPEAKERS</h3>
                <div className="shop">SHOP <img 
                 alt="" className="right-arrow" src={iconRightArrow}/></div>
            </div>
            </Link>

            <Link to='/products/earphones' state={{from:location.pathname}} >
            <div className="menu-item">
                <img  alt="image of earphones" className="earphones" src={earPhoneImg}/>
                <h3>EARPHONES</h3>
                <div className="shop">SHOP <img 
                 alt="" className="right-arrow" src={iconRightArrow}/>
                 </div>


                 
            </div>
            </Link>

           
            </div>
    </>)
}
export  default MenuSection;