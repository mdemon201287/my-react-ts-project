// src/components/Cart.tsx
import React from 'react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
    const { cart } = useCart();

    return (
        <div className="container mx-auto px-4 mt-8">
            <h2 className="text-2xl font-bold text-center">Shopping Cart</h2>
            <div className="flex flex-wrap -mx-4">
                {cart.length === 0 ? (
                    <p className="text-center text-gray-500 w-full">Your cart is empty</p>
                ) : (
                    cart.map(item => (
                        <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                            <div className="border rounded-lg overflow-hidden shadow-lg">
                                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h2 className="font-bold text-lg">{item.title}</h2>
                                    <p className="text-gray-700">{item.category}</p>
                                    <p className="text-green-600 font-semibold">${item.price}</p>
                                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-600"
                                        //onClick={() => removeFromCart(item.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Cart;
