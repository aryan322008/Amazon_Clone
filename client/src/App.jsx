import React from 'react';
import Navbar from './components/Home/navbar/navbar';
import Carousel from './components/Home/carousel/carousel';
import Container from './components/Home/container/container';
import Auth from './components/auth/auth';
import Cart from "./components/Cart/cart";
import Orders from "./components/Orders/orders";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";



const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={
          <>
            <Navbar />
            <Carousel />
            <Container />
          </>
        } />

        <Route path="/cart" element={
          <div className="main">
            <Navbar />
            <Cart />
          </div>
        } />

        <Route path="/auth" element={<Auth />} />


        <Route path="/orders" element={
           <div className="main">
            <Navbar />
            <Orders />
          </div>
        } />


      </Routes>
    </Router>
  );
}

export default App;
