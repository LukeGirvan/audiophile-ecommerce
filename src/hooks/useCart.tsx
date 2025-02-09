import { CartContextType } from "../types/cartTypes";
import {CartContext} from "../components/cartContext"
import { useContext } from "react";

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (context === undefined) {
      throw new Error('useCart must be used within a CartProvider');
    }else{
        return context;
    }
    
  };