/* eslint-disable react-hooks/exhaustive-deps */
import axiosClient from "API/api.config";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "../../components/Pagination/Pagination";
import style from "./Category.module.css";
import SelectManu from "./SelectManu";
import SelectPrice from "./SelectPrice";

function Category({ handleAddProducts }) {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const { search } = useLocation();
  const [limit, setLimit] = useState(5);
  const [totalPages, setToTalPages] = useState(0);

  const { page, manufacture, sort } = useMemo(() => {
    const page = new URLSearchParams(search).get("page") || 1;
    const manufacture = new URLSearchParams(search).get("manufacture") || 0;
    const sort = new URLSearchParams(search).get("sort") || "";
    return {
      page: Number(page),
      manufacture: Number(manufacture),
      sort: sort,
    };
  }, [search]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axiosClient.get(
          `/product/pagination/category/${params.id}?manufacture=${manufacture}&limit=${limit}&page=${page}&sort=${sort}`
        );
        const total = Math.ceil(data.count / limit);
        setToTalPages(total);
        setProducts(data.rows);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    getProducts();
  }, [page, manufacture, sort]);

  return (
    <div className={style.category}>
      <div className={`${style.container}`}>
        <div className={`${style["category-head"]}`}>
          <div className={style["category-head-select-manu"]}>
            <SelectManu
              categoryId={params.id}
              page={page}
              manufacture={manufacture}
              sort={sort}
            />
          </div>
          <div className={style["category-head-select-price"]}>
            <SelectPrice page={page} manufacture={manufacture} />
          </div>
        </div>
        <div className={`${style["category-content"]} row `}>
          {products?.map((product, index) => (
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
                <span className={style["item-manufactory"]}>
                  {product["manufacture.name"] === "asus" && (
                    <img src="../../../images/Manufactory/asus.PNG" alt="" />
                  )}
                  {product["manufacture.name"] === "dell" && (
                    <img src="../../../images/Manufactory/dell.PNG" alt="" />
                  )}
                  {product["manufacture.name"] === "macbook" && (
                    <img src="../../../images/Manufactory/apple.PNG" alt="" />
                  )}
                </span>
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
        <Pagination
          totalPages={totalPages}
          page={page}
          manufacture={manufacture}
          sort={sort}
        />
      </div>
    </div>
  );
}

export default Category;
