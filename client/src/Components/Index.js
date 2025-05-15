import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // turn off loading when done
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    navigate('/product', { state: { product } });
  };

  return (
    <div className='index'>
      <div className='page-heading'>
        <h1>Welcome to Aliste</h1>
        <h5>An E-Commerce Company</h5>
      </div>

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className='products'>
          {products.map((Element, index) => (
            <div className='product' key={index} onClick={() => handleProductClick(Element)}>
              <img src={Element.image} alt={Element.title} />
              <div className='product-name'>
                {Element.title.length > 20
                  ? Element.title.slice(0, 20) + '...'
                  : Element.title}
              </div>
              <div className='product-price'>Price: ${Element.price}</div>
              <div className='product-rating'>Rating: {Element.rating.rate} ⭐ ({Element.rating.count})</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
