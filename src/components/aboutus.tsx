import { useState, useEffect } from "react";
import '../styles/bottom.scss'


function About(){

    const [humanImageSrc, setHumanImageSrc] = useState<string>('')
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth); // Track window width


    function changeImages(screenWidth:number){
        if(screenWidth >= 1200){
          
            setHumanImageSrc('/assets/shared/desktop/image-best-gear.jpg')
        }
        if(screenWidth >= 768 && screenWidth <1200){
           
            setHumanImageSrc('/assets/shared/tablet/image-best-gear.jpg')
        }
        if(screenWidth < 768){
            
            setHumanImageSrc('/assets/shared/mobile/image-best-gear.jpg')
        }
    }

        useEffect(()=>{
            changeImages(windowWidth)

    const handleResize = () => {
        const newWidth = window.innerWidth;
        setWindowWidth(newWidth); 
        changeImages(newWidth); 
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [windowWidth])

    return(<>
    <div className="about-us">
                <div className="about-paragraph">
                    <h1 className="big-title">
                    BRINGING YOU THE <span className="orange-font">BEST</span> AUDIO GEAR
                    </h1>
                {"Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment. "}
                </div>
                <img src={humanImageSrc}alt="" className="black-white-image" />
            </div>
    </>)
}
export default About;