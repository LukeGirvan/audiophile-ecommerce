import headPhoneImg from '/assets/shared/desktop/image-headphones.png'
import earPhoneImg from '/assets/shared/desktop/image-earphones.png'
import speakerImg from '/assets/shared/desktop/image-speakers.png'

import { Link } from "react-router-dom";
import '../styles/menusection.scss'
import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";


function MenuSection(){


    const location = useLocation()
    // const [earphoneImage, setEarPhoneImage] = useState('')
    // const [headPhoneImage, setHeadPhoneImage] = useState('')
    // const [speakerImage, setSpeakerImage] = useState('')
    
    // const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth); // Track window width

    // function changeImages(screenWidth:number){
    //     if(screenWidth >= 1200){
    //         setEarPhoneImage('assets/shared/desktop/image-earphones.png')
    //         setHeadPhoneImage('assets/shared/desktop/image-headphones.png')
    //         setSpeakerImage('assets/shared/desktop/image-speakers.png')

    //     }
    //     if(screenWidth >= 768 && screenWidth <1200){
    //         setEarPhoneImage('assets/shared/tablet/image-earphones.png')
    //         setHeadPhoneImage('assets/shared/tablet/image-headphones.png')
    //         setSpeakerImage('assets/shared/tablet/image-speakers.png')
    //     }
    //     if(screenWidth < 768){
    //         setEarPhoneImage('assets/shared/mobile/image-earphones.png')
    //         setHeadPhoneImage('assets/shared/mobile/image-headphones.png')
    //         setSpeakerImage('assets/shared/mobile/image-speakers.png')
    //     }

    // }

    // useEffect(()=>{
    //     changeImages(windowWidth)

    //     const handleResize = () => {
    //         const newWidth = window.innerWidth;
    //         setWindowWidth(newWidth); 
    //         changeImages(newWidth); 
    //     };

    //     window.addEventListener('resize', handleResize);

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    //     }, [windowWidth])



    return(<>
    <div className="menu-section">
            <Link to='/products/headphones' state={{from:location.pathname}} >
            <div className="menu-item">
                <img  alt="image of headphones" className="headphones" src={headPhoneImg}/>
                <h3>HEADPHONES</h3>
                <div className="shop">SHOP<img 
                 alt="" className="right-arrow" /> </div>
            </div>
            </Link>
            <Link to='/products/speakers'state={{from:location.pathname}} >
            <div className="menu-item">
                <img  alt="image of speakers" className="speakers" src={speakerImg} />
                <h3>SPEAKERS</h3>
                <div className="shop">SHOP <img 
                 alt="" className="right-arrow" src='assets/shared/desktop/icon-right-arrow.svg' /></div>
            </div>
            </Link>

            <Link to='/products/earphones' state={{from:location.pathname}} >
            <div className="menu-item">
                <img  alt="image of earphones" className="earphones" src={earPhoneImg}/>
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