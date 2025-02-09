import { createContext, useState, ReactNode, useEffect } from "react";
import { CartContextType, CartItem } from "../types/cartTypes";
import * as React from 'react';


export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProps> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>(
        JSON.parse(window.localStorage.getItem('cart') as string) || []
    );
    const [cartVisible, setCartVisible] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const addItem = (item: CartItem) => {
        const old = [...items];
        const isAlreadyInCart = getItemQuantity(item.id) > 0;

        if (isAlreadyInCart) {
            const updatedItems = old.map((oldItem) =>
                oldItem.id === item.id ? { ...oldItem, quantity: oldItem.quantity + item.quantity } : oldItem
            );
            setItems(updatedItems);
            localStorage.setItem('cart', JSON.stringify(updatedItems));
        } else {
            const updatedItems = [...old, item];
            setItems(updatedItems);
            localStorage.setItem('cart', JSON.stringify(updatedItems));
        }
    };

    const increaseQuantity = (id: number) => {
        const newItems = items.map((i: CartItem) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
        );
        setItems(newItems);
        localStorage.setItem('cart', JSON.stringify(newItems));
    };

    const decreaseQuantity = (id: number) => {
        const newItems = items.map((i: CartItem) =>
            i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
        );
        setItems(newItems.filter((i) => i.quantity > 0));
        localStorage.setItem('cart', JSON.stringify(newItems));
    };

    const removeItem = (id: number) => {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
    };

    const clearCart = () => {
        setItems([]);
        localStorage.removeItem('cart');
    };

    const showCart = () => {
        // const whiteModal = document.querySelector('.white-modal') as HTMLDivElement
        // const blurModal = document.querySelector('.blur-modal') as HTMLDivElement
        // if(!blurModal.classList.contains('hidden') && !whiteModal.classList.contains('hidden')){
        //     blurModal.classList.toggle('hidden') && !whiteModal.classList.toggle('hidden')
        // }
        setCartVisible(!cartVisible);
       if(!document.body.classList.contains('scroll-lock')){
        document.body.classList.toggle('scroll-lock');
       }
    };

    const hideCart = () => {
        const whiteModal = document.querySelector('.white-modal') as HTMLDivElement;
        setCartVisible(false);
        if(document.body.classList.contains('scroll-lock') && !whiteModal.classList.contains('show')){
            document.body.classList.toggle('scroll-lock');
        }
            
        
    };

   

    const getItemQuantity = (id: number) => {
        return items.find(item => item.id === id)?.quantity || 0;
    };

    const getTotalQuantity = () => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalPrice = () => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    useEffect(() => {
        setTotalPrice(getTotalPrice());
    }, [items]);

    return (
        <CartContext.Provider
            value={{
                items,
                totalPrice,
                cartVisible,
                addItem,
                removeItem,
                clearCart,
                showCart,
                hideCart,
                getTotalQuantity,
                getItemQuantity,
                increaseQuantity,
                decreaseQuantity,
                getTotalPrice
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
