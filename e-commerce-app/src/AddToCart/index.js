import React from "react";
import "../HomePage/index.css";
import cartEmpty from "../assets/empty-cart.gif"

export const AddToCart = (props) => {
  const { addProducts,cartProductDelete } = props;
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
  const handleDelete = (deleteData) =>{
      cartProductDelete(deleteData)
  }

  return (
    <div>
      {addProducts.lenght !== 0 &&
      <div className="products-list">
        {addProducts?.map((data, index) => (
          <section className="product" key={index}>
            <img src={data.image} alt={data.category} />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button style={cancelButton} onClick={()=>handleDelete(data)}>
                <i
                  style={{ padding: "0px 5px 0px 0px" }}
                  className="bi bi-bag-x-fill"
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
      <img src={cartEmpty} alt="empty"/>
     </div>
    </div>
  );
};
