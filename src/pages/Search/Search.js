import axiosClient from "API/api.config";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./Search.module.css";

function Search({ handleAddProducts }) {
  const [showResult, setShowResult] = useState([]);
  const { search } = useLocation();
  const { query } = useMemo(() => {
    const query = new URLSearchParams(search).get("query") || "";
    return {
      query: query,
    };
  }, [search]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const  data  = await axiosClient.get(
          `/product/search`,
          {params:{
            query
          }}
        );
        setShowResult(data.foundProducts);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    getProducts();
  }, [query]);

  return (
    <div className={style.search}>
      <div className={style.container}>
        <div className={`${style.content} row`}>
          {showResult?.map((product, index) => (
            <div className={`${style.cover} col l-2-4 m-6 c-12`} key={index}>
              <div className={`${style.item} `}>
                <Link
                  to={`/detail/${product.id}`}
                  className={style["item-image"]}
                >
                  <img
                    src={`${process.env.REACT_APP_SERVER_URL}/assets/${product.image}`}
                    alt="Apple"
                  />
                </Link>
                
                <h4 className={style["item-name"]}>{product.name}</h4>
                <span className={style["item-description"]}>
                  {product.description}
                </span>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
