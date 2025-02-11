import '../styles/productdetails.scss'
import BottomSection from './bottomsection';
import { useParams } from "react-router-dom";
import data from '../json/data.json'
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MenuSection from './menusection';
import { useCart } from '../hooks/useCart';
import {Alert, Snackbar} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import {Product} from '../types/productTypes'


function ProductContent(){
    const location = useLocation()
    const {key} = useParams()
    const {productType} = useParams()
    const [quantity, setQuantity] = useState(1)
    const [open, setOpen] = useState(false);

    const {addItem} = useCart()
    console.log( data.categories)
    //@ts-ignore
    const productCategory = data.categories[productType].products
    


    const productInfo = productCategory.filter((product:Product) => product.slug===key)
    console.log(productInfo[0])
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

 

    // console.log(productInfo[0])

    const addQuantity = () => {
        setQuantity(quantity +1)
    }

    const subtractQuantity = () => {
        if(quantity >=2){
            setQuantity(quantity -1)
        }
    }

   


    const  chooseImageSource =(windowWidth:number, sourceSet:any) =>{
            if(windowWidth < 768){
                return sourceSet.mobile
            }
            else if(windowWidth> 768 && 
                windowWidth < 1200
            ){
                return sourceSet.tablet
            }
            else{
                return sourceSet.desktop
            }

        }

        const createItem = () =>{
            const product = productInfo[0]
            const item = {
                id:product.id,
                quantity: quantity,
                name:product.name,
                cartName:product.cartName,
                price: product.price,
                image:{
                    mobile:product.image.mobile,
                    tablet:product.image.tablet,
                    desktop:product.image.desktop
                }
            }
            console.log(item)
            addItem(item)
            
            setOpen(true)



        }


    useEffect(() => {
        document.documentElement.scrollTo(0,0)
        
      },[productInfo[0]]);

    useEffect(() => {
        
        const handleResize = () => {
            const newWidth = window.innerWidth;
            setWindowWidth(newWidth); 
          };
      
          window.addEventListener('resize', handleResize);
      
          return () => {
            window.removeEventListener('resize', handleResize);
          };
       
      }, [windowWidth]);


    //   console.log(productInfo[0].image)

    return(
    <div className="wrapper" id="product-details">
        <div className="go-back">
            <Link to={location.state.from} state={{from: location.pathname}}>Go Back</Link>
        </div>
    <div className="product-section">
        <div className="product-image">
            <img src={chooseImageSource(windowWidth,productInfo[0].image)} alt="" />
        </div>
        <div className="product-details">
        <h2 className="sub-title">
            {productInfo[0].new ? 'NEW PRODUCT' : ''}
        </h2>
        <h1 className="product-title">
            {productInfo[0].name.toUpperCase()}
        </h1>
        <p className="product-description">
            {productInfo[0].description}
        </p>
        <p className="price">
            $ {productInfo[0].price.toLocaleString()}
        </p>
        <div className="add-to-cart">
          <div className="choose-quantity">
            <a  className="minus" onClick={subtractQuantity}>-</a> <span className="quantity">{quantity}</span> <a  className="add" onClick={addQuantity}>+</a>
            </div>  
            <button className="button1" onClick={createItem}>ADD TO CART</button>
        </div>
        </div>
        </div>
        <div className="feature-section">
           <div className="features">
           <h2 className="big-title">
                FEATURES
            </h2>
            <p className="feature-description">
                {productInfo[0].features}
            </p>
           </div>
           <div className="in-the-box">
           
           <h2 className="big-title">
                IN THE BOX
            </h2>
           <div className="included-items">
           {
                productInfo[0].includes.map((product:any)=>(
                    
                    <div className="included">
                        <span className="orange-font">
                          x{product.quantity}
                        </span>
                          {product.item}
                    </div>
                    
                ))
                
                }
           </div>
           </div>

           
        </div>
        <div className="gallery-section">
            <div className="smaller-images">
                <img src={chooseImageSource(windowWidth,productInfo[0].gallery.first)} alt="" />
                <img src={chooseImageSource(windowWidth,productInfo[0].gallery.second)} alt="" />
            </div>
            <div className="big-image">
            <img src={chooseImageSource(windowWidth,productInfo[0].gallery.third)} alt="" />
            </div>
        </div>

        <div className="you-may-also-like">
            <h3 className='may-like-h3'>YOU MAY ALSO LIKE</h3>
            <div className="item-holder">
            {productInfo[0].others.map((item:any)=>(
                
                <div className="item">
                    <img src={chooseImageSource(windowWidth, item.image)} alt="" />
                    <h2 className="product-title">
                        {item.name.toUpperCase()}
                    </h2>
                    
                    {/* <Link to='/products/speakers'state={{from:location.pathname}} > */}
                    <Link  to={`/product-details/${item.category}/${item.slug}`} state={{from:location.pathname}} >
                    <button className="button1">
                        SEE PRODUCT
                    </button>
                    </Link>
                </div>
            ))}
            </div>
        </div>
           <MenuSection/>
    <BottomSection/>
    <Snackbar
      open={open}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      autoHideDuration={3000}
    >
      <Alert
        icon={<CheckIcon fontSize="inherit" />}
        severity="success"
        onClose={() => setOpen(false)}
      >
       Item {productInfo[0].name} added to cart successfully
      </Alert>
    </Snackbar>
    </div>
    )
}
export default ProductContent;