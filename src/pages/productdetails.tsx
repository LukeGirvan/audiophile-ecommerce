import Navbar from "../components/navbar";
import ProductContent from "../components/productdetailscontent";
import { CartProvider } from "../components/cartContext";

function ProductDetails(){
return(
    <>
    <CartProvider>
    <Navbar />
    
    <ProductContent />
    </CartProvider>

    </>
)
}
export default  ProductDetails;