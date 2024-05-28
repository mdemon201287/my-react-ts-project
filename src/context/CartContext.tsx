import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    quantity: number;
}

interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    incrementQuantity: (id: number) => void;
    decrementQuantity: (id: number) => void;
    clearCart: () => void;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    const updateCartStorage = (updatedCart: Product[]) => {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                const updatedCart = prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
                updateCartStorage(updatedCart);
                return updatedCart;
            }
            const updatedCart = [...prevCart, { ...product, quantity: 1 }];
            updateCartStorage(updatedCart);
            return updatedCart;
        });
    };

    const incrementQuantity = (id: number) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            );
            updateCartStorage(updatedCart);
            return updatedCart;
        });
    };

    const decrementQuantity = (id: number) => {
        setCart((prevCart) => {
            const updatedCart = prevCart
                .map((item) =>
                    item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0);
            updateCartStorage(updatedCart);
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, incrementQuantity, decrementQuantity, clearCart, cartCount }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
