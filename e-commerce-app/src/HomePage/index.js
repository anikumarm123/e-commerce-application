import React, { useState } from "react";
import "../HomePage/index.css";

export const HomePage = (props) => {
  const {
    listOfProducts,
    addToCart,
    addToFavorite,
    addProducts,
    favoriteProducts,
    cartProductId,
    favoriteProductId,
  } = props;
  const [viewMoreDetail, setViewMoreDetails] = useState(false);
  const [viewProduct, setViewProduct] = useState({});
  const productRatings = [1, 2, 3, 4, 5];

  const handleAddProduct = (data) => {
    const isId = cartProductId.includes(data.id);

    if (isId) {
      const filterProducts = addProducts.filter(
        (product) => product.id !== data.id
      );
      addToCart(data, filterProducts)
    } else {
      addToCart(data);
    }
  };
 
  const handleFavoriteProduct = (data) => {
    const isId = favoriteProductId.includes(data.id);
    if (isId) {
      const filterProducts = favoriteProducts.filter(
        (product) => product.id !== data.id
      );
      addToFavorite(data, filterProducts);
    } else {
      addToFavorite(data);
    }
  };

  const handleViewDetail = (data) => {
    setViewProduct(data);
    setViewMoreDetails(true);
  };

  const handleCloseDetails = () => {
    setViewMoreDetails(false);
  };
  return (
    <div>
      {!viewMoreDetail ? (
        <div className="products-list">
          {listOfProducts?.map((data, index) => (
            <section className="product" key={index}>
              <img src={data.image} alt={data.category} />
              <div className="product-content">
                <div className="product-actions">
                  {addProducts.includes(data) ? (
                    <button onClick={() => handleAddProduct(data)} className="uncart">
                      <i className="bi bi-bag-x-fill"></i>
                    </button>
                  ) : (
                    <button onClick={() => handleAddProduct(data)} className="cart">
                      <i className="bi bi-bag-plus-fill"></i>
                    </button>
                  )} 
                  {favoriteProducts.includes(data) ? (
                    <button onClick={() => handleFavoriteProduct(data)} className="uncart">
                      <i className="bi bi-bag-heart-fill"></i>
                    </button>
                  ) : (
                    <button onClick={() => handleFavoriteProduct(data)} className="cart">
                      <i className="fa-solid fa-heart"></i>
                    </button>
                  )}

                  <button onClick={() => handleViewDetail(data)} className="cart">
                    <i className="fa-solid fa-eye"></i>
                  </button>
                </div>
                <div className="product-title">
                  <h3>{data.title}</h3>
                </div>
                <div className="product-rating">
                  <span>rating:</span>
                  <span>
                    {productRatings.map((rating, index) => {
                      if (rating <= data.rating.rate) {
                        return (
                          <i
                            key={index}
                            className="fa-solid fa-star"
                            id="rated"
                          ></i>
                        );
                      }
                      return (
                        <i
                          key={index}
                          className="fa-solid fa-star"
                          id="unrated"
                        ></i>
                      );
                    })}
                  </span>
                </div>
                <div className="product-price">
                  <p>
                    Price:<span>{Math.round(data.price) * 10}</span>
                  </p>
                  <p>
                    <s>{Math.round(data.price * (1 + 0.1)) * 10}</s>
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="view-more-details">
          <div className="more-details">
            <div className="product-image">
              <img src={viewProduct.image} alt="more-detail" />
            </div>
            <div className="view-product-content">
              <div className="product-title">
                <h3>{viewProduct.title}</h3>
                <button onClick={handleCloseDetails}>
                  <i className="fa-sharp fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="product-rating">
                <span>rating:</span>
                <span>
                  {productRatings.map((rating, index) => {
                    if (rating <= viewProduct.rating.rate) {
                      return (
                        <i
                          key={index}
                          className="fa-solid fa-star"
                          id="rated"
                        ></i>
                      );
                    }
                    return (
                      <i
                        key={index}
                        className="fa-solid fa-star"
                        id="unrated"
                      ></i>
                    );
                  })}
                </span>
              </div>
              <div className="product-price">
                <p>
                  Price:<span>{Math.round(viewProduct.price) * 10}</span>
                </p>
                <p>
                  <s>{Math.round(viewProduct.price * (1 + 0.1)) * 10}</s>
                </p>
              </div>
              <div className="product-description">
                <h3>Description:</h3>
                <p>{viewProduct.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
           
    </div>
  );
};
