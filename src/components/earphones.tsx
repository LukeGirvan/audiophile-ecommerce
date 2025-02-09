import '../styles/earphones.scss'
import BottomSection from "../components/bottomsection";
import earPhoneImage from '../assets/category-earphones/desktop/image-yx1-earphones.jpg'
import MenuSection from './menusection';
import data from '../json/data.json'
import { useEffect, useState } from 'react';
import { useLocation,Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

interface IncludedItem {
    quantity: number;
    item: string;
  }
  
  interface Image {
    mobile: string;
    tablet: string;
    desktop: string;
  }
  
  interface Gallery {
    first: Image;
    second: Image;
    third: Image;
  }
  
  interface OtherProduct {
    slug: string;
    name: string;
    image: Image;
  }
  
  interface Product {
    id: number;
    slug: string;
    name: string;
    image: Image;
    category: string;
    new: boolean;
    price: number;
    description: string;
    features: string;
    includes: IncludedItem[];
    gallery: Gallery;
    others: OtherProduct[];
  }
  
  interface Category {
    products: Product[];
  }
  
  interface Categories {
    categories: {
      [key: string]: Category;
    };
  }
  
  type CategoryKey = 'speakers' | 'headphones' | 'earphones';

function EarphoneSection(){

    const location = useLocation(); 
    console.log(location.pathname)
    const  {key}  = useParams<{ key: CategoryKey }>();
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth); 


    const categories = data.categories;
    
    const categoriesData = data.categories
    // @ts-ignore
    const categoryData = key ? categoriesData[key] : undefined;

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

  useEffect(() => {
 
    document.documentElement.scrollTo(0,0)
    return () => {
      
    };
  }, [location]);



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






    return(<>
        <div className="wrapper" id="products">
            <div className="label">
                <h1>{key?.toUpperCase()}</h1>
            </div>
      
            {// @ts-ignore
            categoryData.products.map((product:any,index:number) => (
                
                <div key={product.id} className={`product-section ${index %2 !==0 ? "reverse": ""} ${index %2 !==0 ? "slide-left": "slide-right"}`}>
                    <div className="product-image">
                        <img src={chooseImageSource(windowWidth, product.categoriesImage)} alt="" />
                    </div>
                    <div className="product-details">
                    <h2 className="sub-title">{product.new ? 'NEW PRODUCT':''}</h2>
                    <h1 className='product-title'>{product.name.toUpperCase()}</h1>
                    <p className='product-description'>{product.description}</p>
                    <Link  to={`/product-details/${product.category}/${product.slug}`} state={{from:location.pathname}} >
                    <button className="button1">
                        SEE PRODUCT
                    </button>
                    </Link>
                    </div>
                </div>
                
            ))}
            {/* </div> */}
            <MenuSection/>
            <BottomSection/>
        </div>
    
    </>
    )
}
export default EarphoneSection;