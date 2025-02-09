import Navbar from "../components/navbar";
import HomeContent from "../components/homecontent";
import { CartProvider } from "../components/cartContext";

function Home(){
return(
    <>
    <CartProvider>
    <Navbar/>
    <HomeContent/>
    </CartProvider>
    </>
)
}
export default Home;