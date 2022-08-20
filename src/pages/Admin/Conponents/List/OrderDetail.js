import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import style from "./OrderDetail.module.css";

function OrderDetail({ close, id }) {
  const [products, setProducts] = useState([]);
  const login = JSON.parse(localStorage.getItem("login")) || null;
  useEffect(() => {
    if (login) {
      const getData = async () => {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/orderDetail/order/${id}`,
            {
              headers: {
                "access-token":
                  "Bearer " +
                  JSON.parse(localStorage.getItem("login")).accesstoken,
              },
            }
          );
          setProducts(data);
        } catch (error) {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      };
      getData();
    }
  }, []);
  return (
    <div className={style.modal}>
      <a className={style.close} onClick={close}>
        &times;
      </a>
      <div className={style.header}> Order Detail </div>
      <div className={style.content}>
        <table>
          <thead className={style["content-head"]}>
            <tr className="row no-gutters">
              <th className={`${style.id} col l-1`}>id</th>
              <th className={`${style.quantity} col l-1`}>quantityProduct</th>
              <th className={`${style.vat} col l-1`}>VAT</th>
              <th className={`${style.name} col l-1`}>name</th>
              <th className={`${style.price} col l-1`}>price</th>
              <th className={`${style.description} col l-3`}>description</th>
              <th className={`${style.image} col l-1`}>image</th>
              <th className={`${style.nameCategory} col l-1`}>nameCategory</th>
              <th className={`${style.nameManufacture} col l-2`}>
                nameManufacture
              </th>
            </tr>
          </thead>
          <tbody className={style["content-body"]}>
            {products?.map((product) => {
              return (
                <tr className="row no-gutters" key={product.id}>
                  <td className={`col l-1`}>{product.id}</td>
                  <td className={`col l-1`}>{product.quantityProduct}</td>
                  <td className={`col l-1`}>{product.VAT}</td>
                  <td className={`col l-1`}>{product["product.name"]}</td>
                  <td className={`col l-1`}>${product["product.price"]}</td>
                  <td className={`col l-3`}>
                    {product["product.description"]}
                  </td>
                  <td className={`col l-1`}>
                    <img
                      src={`${process.env.REACT_APP_SERVER_URL}/${product["product.image"]}`}
                    />
                  </td>
                  <td className={`col l-1`}>
                    {product["product.category.name"]}
                  </td>
                  <td className={`col l-2`}>
                    {product["product.manufacture.name"]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderDetail;
