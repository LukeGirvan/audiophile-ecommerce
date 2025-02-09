export interface CartItem {
    id: number;
    quantity:number;
    price: number;
    cartName:string;
    name:string;
    image:{
        mobile:string;
        tablet:string;
        desktop:string;
    };

}

export interface CartContextType {
    items: CartItem[];
    totalPrice: number;
    cartVisible:boolean;
    addItem: (item:CartItem) => void;
    removeItem: (id:number) => void;
    increaseQuantity:(id:number) =>void;
    decreaseQuantity:(id:number) =>void;
    clearCart: () => void;
    showCart: () => void;
    getTotalQuantity: () => number;
    getItemQuantity: (id:number) => number;
    getTotalPrice: () => number;
    hideCart: () => void;
    

}