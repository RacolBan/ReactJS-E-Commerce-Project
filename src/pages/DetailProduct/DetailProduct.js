import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./DetailProduct.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";

function DetailProduct({ products, handleAddProducts }) {
  const params = useParams();
  const [productDetail, setProductDetail] = useState([]);
  useEffect(() => {
    if (params.id) {
      const getOneProduct = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:8000/product/${params.id}`
          );
          setProductDetail(data.product);
        } catch (error) {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      };
      getOneProduct();
    }
  }, [params.id]);

  const settings = {
    dots: false,
    infinite: true,
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
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className={style.detail}>
      <div className={`${style.container}`}>
        <div className={`${style.content} row`}>
          <div className={`${style["container-left"]} col l-6 m-6 c-12`}>
            {productDetail.image && (
              <img
                src={`http://localhost:8000/${productDetail.image}`}
                alt="image"
              />
            )}
          </div>
          <div className={`${style["container-right"]} col l-6 m-6 c-12`}>
            <h3 className={style["container-right-title"]}>
              {productDetail.name}
            </h3>
            <p className={style["container-right-description"]}>
              {productDetail.description}
            </p>
            <p className={style["container-right-price"]}>
              {`$${productDetail.price}`}
            </p>
            <button
              className={style["container-right-btn"]}
              onClick={() => {
                handleAddProducts(productDetail);
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <div className={style.wrapper}>
        <div className={style.head}>
          <h3>Related Products</h3>
        </div>
        <div className={style["listItem"]}>
          <Slider {...settings}>
            {products?.map((product, index) =>
              product.manufactureId === productDetail.manufactureId ? (
                <div className={style.item} key={index}>
                  <Link
                    to={`/detail/${product.id}`}
                    className={style["item-image"]}
                  >
                    <img
                      src={`http://localhost:8000/${product.image}`}
                      alt="image"
                    />
                  </Link>
                  <span className={style["item-manufactory"]}>
                    {productDetail.manufactureId === 2 && (
                      <img
                        src="../../../../images/Manufactory/asus.PNG"
                        alt=""
                      />
                    )}
                    {productDetail.manufactureId === 1 && (
                      <img
                        src="../../../../images/Manufactory/dell.PNG"
                        alt=""
                      />
                    )}
                    {productDetail.manufactureId === 3 && (
                      <img
                        src="../../../../images/Manufactory/apple.PNG"
                        alt=""
                      />
                    )}
                  </span>
                  <h4 className={style["item-name"]}>{product.name}</h4>
                  <span className={style["item-price"]}>${product.price}</span>
                  <span
                    className={style["btn-addCart"]}
                    onClick={() => {
                      handleAddProducts(product);
                    }}
                  >
                    Add To Cart
                  </span>
                </div>
              ) : null
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
