import React from "react";
import emptyFav from "../assets/empty-fav.gif";
export const AddFavorite = (props) => {
  const { favoriteProducts,favoriteProductsDelete } = props;
  const productRatings = [1, 2, 3, 4, 5];
  const cancelButton = {
    height: "30px",
    width: "100px",
    backgroundColor: "#e14c38",
    color: "#fff",
    border: "none",
    fontSize: "14px",
    fontFamily: "'Jost', sans-serif",
  };
  const handleDelete = (favoriteData)=>{
    favoriteProductsDelete(favoriteData)
  }
  return (
    <div>
      {favoriteProducts.lenght !== 0 &&
      <div className="products-list">
        {favoriteProducts?.map((data, index) => (
          <section className="product" key={index}>
            <img src={data.image} alt={data.category} />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button style={cancelButton} onClick={()=>handleDelete(data)}>
                <i
                  className="bi bi-bag-heart-fill"
                  style={{ padding: "0px 5px 0px 0px" }}
                ></i>
                Cancel
              </button>
            </div>
            <div className="product-content">
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
                          className="fa-solid fa-star"
                          id="rated"
                          key={index}
                        ></i>
                      );
                    }
                    return (
                      <i
                        className="fa-solid fa-star"
                        id="unrated"
                        key={index}
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
      }
      <div style={{display:"flex",justifyContent:"center"}}>
         <img style={{width:"400px",height:"400px"}} src={emptyFav} alt="fav-empty"/>
      </div>
    </div>
                
  );
                
};
