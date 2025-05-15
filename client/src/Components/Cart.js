import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            alert('Please log in to view your cart.');
            navigate('/');
            return;
        }

        setUsername(loggedInUser);
        const cartKey = `cart_${loggedInUser}`;
        const items = JSON.parse(localStorage.getItem(cartKey)) || [];
        const itemsWithQty = items.map(item => ({ ...item, quantity: item.quantity || 1 }));
        setCartItems(itemsWithQty);
    }, [navigate]);

    const handleRemove = (productId) => {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem(`cart_${username}`, JSON.stringify(updatedCart));
    };

    const handleQuantityChange = (productId, newQty) => {
        const updatedCart = cartItems.map(item =>
            item.id === productId ? { ...item, quantity: parseInt(newQty) } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem(`cart_${username}`, JSON.stringify(updatedCart));
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalCost = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className='cart'>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <img src={item.image} alt={item.title} />
                                <div className="cart-item-info">
                                    <h5>{item.title}</h5>
                                    <p>{item.description}</p>
                                    <p>Rating: {item.rating.rate} ⭐ ({item.rating.count})</p>
                                    <p>Price: ${item.price}</p>

                                    <div className="cart-actions">
                                        <select className='me-2' value={item.quantity} onChange={(e) => handleQuantityChange(item.id, e.target.value)} >
                                            {[...Array(10)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>

                                        <button className="btn btn-sm btn-danger" onClick={() => handleRemove(item.id)} > Remove </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='cart-total'>
                        <p>Total Items: {totalItems}</p>
                        <p>Total Cost: ${totalCost}</p>
                    </div>
                </>
            )}
        </div>
    );
}
