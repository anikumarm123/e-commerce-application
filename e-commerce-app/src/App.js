import "./App.css";
import { NavBar } from "./NavBar/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./HomePage";
import { AddToCart } from "./AddToCart/index";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddFavorite } from "./AddFavorite";

function App() {
  const [listOfProducts, setListOfProducts] = useState([]);
  const [addProducts, setAddProducts] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [cartProductId, setCartProductId] = useState([]);
  const [favoriteProductId, setFavoriteProductId] = useState([]);
  const [searchProducts, setSearchProducts] = useState("");

  useEffect(() => {
    async function getProducts() {
      const getData = await axios.get("https://fakestoreapi.com/products");
      if (searchProducts !== "") {
        const filterCategory = getData.data.filter((product)=> product.category === searchProducts )
         setListOfProducts(filterCategory);
      } 
      else {
        setListOfProducts(getData.data);
      }
    }
    getProducts();
  }, [searchProducts]);

  const addToCart = (cartData, filterCartData) => {
    if (cartData) {
      setCartProductId([...cartProductId, cartData.id]);
      setAddProducts([...addProducts, cartData]);
    }
    if (filterCartData) {
      const filterId = cartProductId.filter((id) => id !== cartData.id);
      setCartProductId(filterId);
      setAddProducts(filterCartData);
    }
  };

  const addToFavorite = (favoriteData, filterFavData) => {
    if (favoriteData) {
      setFavoriteProductId([...favoriteProductId, favoriteData.id]);
      setFavoriteProducts([...favoriteProducts, favoriteData]);
    }
    if (filterFavData) {
      const filterId = favoriteProductId.filter((id) => id !== favoriteData.id);
      setFavoriteProductId(filterId);
      setFavoriteProducts(filterFavData);
    }
  };

  const handleSearchProducts = (searchItem) => {
    setSearchProducts(searchItem);
  };
  const cartProductDelete = (deleteCartData)=>{
    const filterId = cartProductId.filter((id) => id !== deleteCartData.id);
    setCartProductId(filterId);
    const removeData = addProducts.filter((cartData)=>cartData !== deleteCartData);
    setAddProducts(removeData);
  }
  const favoriteProductsDelete = (deleteFavoriteData)=>{
    const filterId = favoriteProductId.filter((id) => id !== deleteFavoriteData.id);
    setFavoriteProductId(filterId);
    const removeData = favoriteProducts.filter((favoriteData)=>favoriteData !== deleteFavoriteData);
    setFavoriteProducts(removeData);
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavBar
                  addProducts={addProducts}
                  favoriteProducts={favoriteProducts}
                  handleSearchProducts={handleSearchProducts}
                />
                <HomePage
                  addProducts={addProducts}
                  favoriteProducts={favoriteProducts}
                  listOfProducts={listOfProducts}
                  addToCart={addToCart}
                  addToFavorite={addToFavorite}
                  cartProductId={cartProductId}
                  favoriteProductId={favoriteProductId}
                />
              </>
            }
          />
          <Route
            path="cartProducts"
            element={
              <>
                <NavBar
                  addProducts={addProducts}
                  favoriteProducts={favoriteProducts}
                />
                <AddToCart 
                  addProducts={addProducts}
                  cartProductDelete={cartProductDelete}
                 />
              </>
            }
          />
          <Route
            path="favoriteProducts"
            element={
              <>
                <NavBar
                  addProducts={addProducts}
                  favoriteProducts={favoriteProducts}
                />
                <AddFavorite
                 favoriteProducts={favoriteProducts}
                 favoriteProductsDelete={favoriteProductsDelete} 
                />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
