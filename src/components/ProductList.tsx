import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    quantity: number;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { addToCart } = useCart();

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleAddToCart = (product: Product) => {
        addToCart(product);
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center my-8">Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(product => (
                    <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
                        <Link to={`/product/${product.id}`}>
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-[160px] object-contain group-hover:scale-110 transition duration-300"
                            />
                        </Link>
                        <div className="p-4">
                            <Link to={`/product/${product.id}`}>
                                <h2 className="font-bold text-lg">{product.title}</h2>
                            </Link>
                            <p className="text-gray-700">{product.category}</p>
                            <p className="text-green-600 font-semibold">${product.price}</p>
                            <p className="text-gray-600 line-clamp-3">{product.description}</p>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
                                onClick={() => handleAddToCart(product)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
