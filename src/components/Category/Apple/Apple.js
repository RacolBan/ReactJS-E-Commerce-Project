import React, { useContext } from "react";
import style from './Apple.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { GlobalState } from '../../../GlobalState'

function Apple({handleAddProducts}) {
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
  const state = useContext(GlobalState)
  const productsApple = state.ProductsApple.productsApple[0];
  return (
    <div className={style.wrapper}>
      <div className={style.head}>
        <h3>Apple Center</h3>
        <Link to={`/category/2`}>
          See all
          <i className="fa fa-angle-double-right"></i>
        </Link>
      </div>
      <Slider {...settings}>
        {productsApple?.map((product, index) => (
          <div className={style.item} key={index}>
            <Link to={`/detail/${product.id}`} className={style["item-image"]}>
              <img src={`${process.env.REACT_APP_SERVER_URL}/${product.image}`} alt="Apple" />
            </Link>
            <span className={style["item-manufactory"]}>
              <img src='./images/Manufactory/apple.png' alt="" />
            </span>
            <h4 className={style["item-name"]}>{product.name}</h4>
            <span className={style["item-price"]}>${product.price}</span>
            <span className={style["btn-addCart"]} onClick={()=>{handleAddProducts(product)}}>Add To Cart</span>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Apple;
