import './Components/style.css';
import Index from "./Components/Index";
import Navigation from './Components/Navigation';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from './Components/Product';
import Cart from './Components/Cart';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </Router>
  );
}

export default App;
