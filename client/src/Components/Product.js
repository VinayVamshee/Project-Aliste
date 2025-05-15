import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Product() {
    const location = useLocation();
    const navigate = useNavigate();
    const { product } = location.state || {};
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                setAllProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchProducts();
    }, []);

    if (!product) {
        return <div>Product not found.</div>;
    }

    const currentIndex = allProducts.findIndex(p => p.id === product.id);
    const nextProducts = allProducts.slice(currentIndex + 1, currentIndex + 6);

    const handleAddToCart = () => {
        const username = localStorage.getItem('loggedInUser');
        if (!username) {
            alert('Please login to add items to your cart.');
            return;
        }

        const cartKey = `cart_${username}`;
        const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

        const isAlreadyInCart = cart.some(p => p.id === product.id);
        if (isAlreadyInCart) {
            alert('Item already in your cart.');
            return;
        }

        cart.push(product);
        localStorage.setItem(cartKey, JSON.stringify(cart));
        alert('Item added to your cart!');
    };

    if (loading) {
        return <div className="loader"></div>;
    }

    return (
        <div>
            <div className="product-detail">
                <img src={product.image} alt={product.title} />
                <div className='product-info'>
                    <div className='product-name'>{product.title}</div>
                    <div className='product-desc'>{product.description}</div>
                    <div className='product-price-rating'>
                        <div className='product-price'>Price: ${product.price}</div>
                        <div className='product-rating'>Rating: {product.rating.rate} ⭐ ({product.rating.count})</div>
                    </div>
                    <button className='btn btn-secondary btn-sm' onClick={handleAddToCart}>
                        <i className="fa-solid fa-cart-plus fa-lg me-2"></i>Add to Cart
                    </button>
                </div>
            </div>

            <div className='next-products'>
                <h3>Explore More Products</h3>
                <div className='products'>
                    {nextProducts.map((item) => (
                        <div className='product' key={item.id} onClick={() => navigate('/product', { state: { product: item } })} >
                            <img src={item.image} alt={item.title} />
                            <div className='product-name'>
                                {item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}
                            </div>
                            <div className='product-price'>Price: ${item.price}</div>
                            <div className='product-rating'>Rating: {item.rating.rate} ⭐ ({item.rating.count})</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
