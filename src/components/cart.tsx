import { useCart } from '../hooks/useCart';
import { CartItem } from '../types/cartTypes';
import '../styles/cart.scss'
import { Link, useLocation } from 'react-router-dom';

function Cart(){

    const {hideCart,cartVisible, clearCart, items, getItemQuantity, addItem, increaseQuantity, decreaseQuantity, totalPrice} = useCart()

    const location = useLocation()
    const add = (e:React.MouseEvent<HTMLAnchorElement>) =>{
        const id = Number((e.target as HTMLAnchorElement).parentElement?.id)
        increaseQuantity(id)
    }

    const subtract = (e:React.MouseEvent<HTMLAnchorElement>) =>{
        const id = Number((e.target as HTMLAnchorElement).parentElement?.id)
        decreaseQuantity(id)
    }
    
    const stopE = (e:React.MouseEvent) =>{
        e.stopPropagation()
    }
return(<>
    <div className={cartVisible ? 'cart-modal show fade-in': 'cart-modal hide fade-out'} onClick={hideCart}>
    <div className={cartVisible ? 'cart show fade-in':'cart hide fade-out' } onClick={stopE} >
        <div className="cart-content">
        <div className="top-div">
        <h1 className="title">
            CART ({items?.length})
        </h1>
        <a className="remove-all" onClick={clearCart}>
        REMOVE ALL</a>
        </div>
        {items.map((item:CartItem) => (
            <div className="cart-item">
                <div className="image-holder">
                <img src={item.image.desktop} alt={`image of ${item.name}`} className="cart-image" />
                <div className="product-details">
                <h3 className="product-title">
                    {item.cartName}
                </h3>
                <p className="price">
                   $ {item.price.toLocaleString()}
                </p>
                </div>
                </div>
                <div className="quantity" id={`${item.id}`}>
                <a  className="minus" onClick={subtract}>-</a> {item.quantity} <a  className="add" onClick={add}>+</a>
            </div>  
            </div>
        ))}
        </div>
        <div className="bottom-div">
            <div className="price-details">
            <p>
                TOTAL
            </p>

            <p className="total-price">
               $ {
                    totalPrice.toLocaleString()
                }
            </p>
            </div>
            <Link to={'/checkout'} state={{from:location.pathname}}>
            <button className="button1 full-width">
                CHECKOUT
            </button>
            </Link>
        </div>
    </div>
    </div>
    
</>)
}
export default Cart;