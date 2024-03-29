import React, { useContext } from "react";
import style from "./Laptop.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

function Laptop({handleAddProducts}) {
  const state = useContext(GlobalState);
  const productsLaptop = state.ProductsLaptop.productsLaptop[0];
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className={style.wrapper}>
      <div className={style.head}>
        <h3>Laptop</h3>
        <Link to={`/category/5`}>
          See all
          <i className="fa fa-angle-double-right"></i>
        </Link>
      </div>
      <Slider {...settings}>
        {productsLaptop && productsLaptop.map((product, index) => (
          //
          <div className={style.item} key={index}>
            <Link to={`/detail/${product.id}`} className={style["item-image"]}>
              <img
                src={`${process.env.REACT_APP_SERVER_URL}/assets/${product.image}`}
                alt="Laptop"
              />
            </Link>
            <span className={style["item-manufactory"]}>
              {product.nameManufacture === "Asus" && 
                <img src="../../../images/Manufactory/asus.PNG" alt="" />
              }
              {product.nameManufacture === "Dell" && (
                <img src="../../../images/Manufactory/dell.PNG" alt="" />
              )}
            </span>
            <h4 className={style["item-name"]}>{product.name}</h4>
            <span className={style["item-description"]}>{product.description}</span>
            <span className={style["item-price"]}>${product.price}</span>
            <span className={style["btn-addCart"]} onClick={()=>{handleAddProducts(product)}}>Add To Cart</span>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Laptop;
