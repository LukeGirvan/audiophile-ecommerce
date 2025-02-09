import Navbar from "../components/navbar";
import { CartProvider } from "../components/cartContext";
import CheckoutForm from "../components/checkoutform";

function Checkout(){
    return(
        <>
        <CartProvider>
        <Navbar/>
        <CheckoutForm/>
        </CartProvider>
        </>
    )
    }
    export default Checkout;