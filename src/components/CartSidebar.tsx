import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartSidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const { cart, incrementQuantity, decrementQuantity, clearCart } = useCart();

    const calculateSubtotal = () => {
        const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        return subtotal.toFixed(2);
    };

    return (
        <div className={`fixed inset-y-0 right-0 bg-white w-64 px-4 py-6 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Cart</h2>
                <button onClick={onClose} className="text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between mb-2">
                            <img src={item.image} alt={item.title} className="w-12 h-12 object-cover" />
                            <div className="ml-2">
                                <p className="font-semibold">{item.title}</p>
                                <p>${item.price} x {item.quantity}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button onClick={() => decrementQuantity(item.id)} className="text-gray-500">-</button>
                                <p>{item.quantity}</p>
                                <button onClick={() => incrementQuantity(item.id)} className="text-gray-500">+</button>
                            </div>
                        </div>
                    ))}
                    <p className="mt-4 font-semibold">Subtotal: ${calculateSubtotal()}</p>
                    <button onClick={clearCart} className="text-red-500 mt-2">Clear Cart</button>
                    <Link to="/" onClick={onClose} className="block mt-2 text-blue-500">Continue Shopping</Link>
                </div>
            )}
        </div>
    );
};

export default CartSidebar;
