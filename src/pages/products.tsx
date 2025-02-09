import Navbar from "../components/navbar";
import  EarphoneSection from '../components/earphones'
import { CartProvider } from "../components/cartContext";
function Earphones(){
        return(
        <>
        <CartProvider>
        <Navbar/>
        <EarphoneSection/>
        </CartProvider>
        
        </>
        )
}
export default Earphones;