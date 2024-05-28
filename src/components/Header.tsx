// src/components/Header.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';

interface HeaderProps {
    onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
    const { cartCount } = useCart();

    return (
        <header className="bg-white py-4 shadow-md fixed w-full z-10 lg:px-8 transition-all">
            <div className="container mx-auto flex items-center justify-between h-full">
                <a href="/">
                    <div className="w-[40px] flex justify-center items-center">
                        <FontAwesomeIcon icon={faHome} className="text-2xl" />
                    </div>
                </a>
                <div className="cursor-pointer flex relative" onClick={onCartClick}>
                    <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
                    {cartCount > 0 && (
                        <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                            {cartCount}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
