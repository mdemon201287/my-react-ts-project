// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import CartSidebar from './components/CartSidebar';
import Header from './components/Header';
import { CartProvider } from './context/CartContext';

const App: React.FC = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen(prevState => !prevState);
    };

    return (
        <CartProvider>
            <Router>
                <Header onCartClick={toggleCart} />
                <div className="bg-gray-100 min-h-screen pt-16">
                    <section className="h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-20">
                        <div className="container mx-auto flex justify-around h-full">
                            <div className="flex flex-col justify-center">
                                <div className="font-semibold flex items-center uppercase">
                                    <div className="w-10 h-[2px] mr-3 bg-cyan-700"></div>
                                    Hot Trend
                                </div>
                                <h1 className="uppercase text-[55px] md:text-[70px] leading-[1.1] font-semibold mb-4">
                                    Fresh Fashion Finds
                                    <br />
                                    <span className="font-light">new collection</span>
                                </h1>
                                <a className="self-start uppercase font-semibold border-b-2 border-primary" href="/">
                                    Discover More
                                </a>
                            </div>
                        </div>
                    </section>
                    <Routes>
                        <Route path="/" element={<ProductList />} />
                        <Route path="/product/:id" element={<ProductDetails onAddToCart={toggleCart} />} />
                    </Routes>
                    <CartSidebar isOpen={isCartOpen} onClose={toggleCart} />
                </div>
            </Router>
        </CartProvider>
    );
};

export default App;
