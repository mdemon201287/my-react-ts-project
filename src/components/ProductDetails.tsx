// src/components/ProductDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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

interface ProductDetailsProps {
    onAddToCart: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ onAddToCart }) => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching data');
                setLoading(false);
            });
    }, [id]);

    const handleAddToCart = (product: Product) => {
        addToCart(product);
        onAddToCart();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto py-16">
            {product && (
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2">
                        <img src={product.image} alt={product.title} className="object-cover w-full h-full" />
                    </div>
                    <div className="md:w-1/2 md:pl-8">
                        <h2 className="text-3xl font-semibold mb-4">{product.title}</h2>
                        <p className="text-xl text-gray-700 mb-4">${product.price}</p>
                        <p className="mb-4">{product.description}</p>
                        <button
                            onClick={() => handleAddToCart(product)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
