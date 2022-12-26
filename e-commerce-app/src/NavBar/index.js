import React, { useState } from "react";
import "../NavBar/index.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router";

export const NavBar = (props) => {
  const navigate = useNavigate();
  const { addProducts, favoriteProducts,handleSearchProducts } = props;
  const [searchProducts,setSearchProducts] = useState("");

  const handleHomePage = () => {
    navigate("/");
  };
  const handleCartPage = () => {
    navigate("/cartProducts");
  };
  const handleSearch = () =>{
     handleSearchProducts(searchProducts)
     setSearchProducts("")
  }
  const handleChange = (event) =>{
    setSearchProducts(event.target.value)
  }
  const handleSelectOptions =(event)=>{
    handleSearchProducts(event.target.value)
  }
  const handleFavoritePage = () => {
    navigate("/favoriteProducts");
  };
  return (
    <section className="nav-section">
      <div className="app-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="search-category">
        <div>
          <input placeholder="Search..." value={searchProducts} onChange={handleChange}/>
          <button className="search-button" onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div>
          <select onChange={handleSelectOptions}>
            <option value="">Category</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>
      </div>
      <div className="navbar-actions">
        <button onClick={handleHomePage}>
          <i className="fa-solid fa-house"></i>
          <p>Home</p>
        </button>
        <button onClick={handleCartPage}>
          <i className="fa-solid fa-cart-plus"></i>
          <p>Cart</p>
          {addProducts.length !== 0 && (
            <div className="badge">{addProducts.length}</div>
          )}
        </button>
        <button onClick={handleFavoritePage}>
          <i className="fa-solid fa-heart"></i>
          <p>Favorite</p>
          {favoriteProducts.length !== 0 && (
            <div className="badge">{favoriteProducts.length}</div>
          )}
        </button>
      </div>
    </section>
  );
};
