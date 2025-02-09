import  '../styles/homecontent.scss'
import '../styles/global.scss'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BottomSection from './bottomsection';
import MenuSection from './menusection';

function HomeContent(){

    const [speakerImageSrc, setSpeakerImageSrc] = useState<string>('')
    const [earphoneImageSrc, setEarphoneImageSrc] = useState<string>('')
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth); // Track window width

    function changeImages(screenWidth:number){
        if(screenWidth >= 1200){
            setSpeakerImageSrc('src/assets/home/desktop/image-speaker-zx9.png')
            setEarphoneImageSrc('src/assets/home/desktop/image-earphones-yx1.jpg')
        }
        if(screenWidth >= 768 && screenWidth <1200){
            setSpeakerImageSrc('src/assets/home/tablet/image-speakers-zx9.png')
            setEarphoneImageSrc('src/assets/home/tablet/image-earphones-yx1.jpg')
        }
        if(screenWidth < 768){
            setSpeakerImageSrc('src/assets/home/mobile/image-speakers-zx9.png')
            setEarphoneImageSrc('src/assets/home/mobile/image-earphones-yx1.jpg')
        }
    }


    useEffect(() => {
 
        document.documentElement.scrollTo(0,0)
        return () => {
          
        };
      }, [location]);






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

    return(
        <>
        <div className="hero-section">
            
            <div className="top-content">
                <h2 className="sub-title">
                    NEW PRODUCT
                </h2>
                <h1 className="big-title">
                    XX99 MARK II HEADPHONES
                </h1>
                <p className='details-paragraph'>
                    Experience natural, lifelike audio 
                    and exceptional build quality made for the passionate
                    music enthusiast.
                </p>
                <Link to='/product-details/headphones/xx99-mark-two-headphones' state={{from:location.pathname}}>
                <button className="button1" >
                    SEE  PRODUCT
                </button></Link>
            </div>

        </div>
        <div className="middle-section">
            <MenuSection/>

            <div className="zx9-speaker-call-to-action">
                <div className="div-with-background">
                <div className="speaker-content">
                    <img src={speakerImageSrc} alt="image of zx9 speaker" className='speaker-big'/>
                    <div className="call-to-action">
                        <h1 className="big-title">
                            ZX9 SPEAKER
                        </h1>
                        <p className='product-description'>
                            Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
                        </p>
                        <Link to='/product-details/speakers/zx9-speaker' state={{from:location.pathname}}>
                        <button className="button2" >
                    SEE  PRODUCT
                </button></Link>
                    </div>
                </div>
                </div>
                
            </div>
            <div className="zx7-speaker-call-to-action">
                <div className="speaker-content">
                    <img  alt="" className='speaker-big'/>
                    <div className="call-to-action">
                        <h1 className="big-title">
                            ZX7 SPEAKER
                        </h1>
                        
                        <Link to='/product-details/speakers/zx7-speaker' state={{from:location.pathname}}>
                        <button className="button3" >
                    SEE  PRODUCT
                </button></Link>
                    </div>
                </div>
            </div>

            <div className="earphone-call-to-action">
                <img src={earphoneImageSrc} alt="" className="earphones-cta" />
                <div className="earphone-details">
                    <div className="details">
                        <h1 className="big-title">
                            YX1 EARPHONES
                        </h1>
                        <Link to='/product-details/earphones/yx1-earphones' state={{from:location.pathname}}>
                        <button className="button3" >
                    SEE  PRODUCT
                </button></Link>
                    </div>
                </div>
            </div>

            <BottomSection/>

            


        </div>
        </>
    
    )
}
export default  HomeContent;



