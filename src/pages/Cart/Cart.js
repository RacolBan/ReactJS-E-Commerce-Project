import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalState } from "../../GlobalState";
import style from "./Cart.module.css";

function Cart({ cartItems, setCartItems, setIsPm, isPm, setLoading }) {
  const [total, setTotal] = useState(0);
  const [method, setMethod] = useState("");

  const login = JSON.parse(localStorage.getItem("login")) || null;
  const state = useContext(GlobalState);
  const user = state.UserAPI.user[0];

  useEffect(() => {
    const getTotal = () => {
      const tt = cartItems.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(tt);
    };
    getTotal();
  }, [cartItems]);

  const increase = (id) => {
    cartItems.forEach((element) => {
      if (element.id === id) {
        element.quantity += 1;
      }
    });
    setCartItems([...cartItems]);
  };

  const decrease = (id) => {
    cartItems.forEach((element) => {
      if (element.id === id) {
        element.quantity === 1
          ? (element.quantity = 1)
          : (element.quantity -= 1);
      }
    });
    setCartItems([...cartItems]);
  };

  const handleDelete = async (id) => {
    if (login) {
      if (window.confirm("Do you want to delete this product?")) {
        setLoading(true);
        try {
          const { data } = await axios.delete(
            `http://localhost:8000/cart/users/${login.userId}/products/${id}`
          );
          cartItems.forEach((item, index) => {
            if (item.id === id) {
              cartItems.splice(index, 1);
            }
          });
          setLoading(false);
          setCartItems([...cartItems]);
          toast.success(data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        } catch (error) {
          setLoading(false)
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    const newPayment = {
      products: cartItems,
      userId: login.userId,
      totalPrice: total,
      method: method,
      email: user.email,
    };
    try {
      const { data } = await axios.post(
        `http://localhost:8000/payment`,
        newPayment
      );
      setIsPm(!isPm);
      setLoading(false);
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleChange = (e) => {
    setMethod(e.target.value);
  };
  return (
    <div className={style.cart}>
      {cartItems.length > 0 ? (
        <div className={style.container}>
          <div className={`${style["list-orders"]} row`}>
            {cartItems.map((cart) => (
              <div className={`${style["list-orders-item"]} `} key={cart.id}>
                <div className={`${style["list-orders-item-img"]} `}>
                  <img
                    src={`http://localhost:8000/${cart.image}`}
                    alt="image"
                  />
                </div>
                <div className={`${style["list-orders-item-content"]}  `}>
                  <span className={style.name}>{cart.name}</span>
                  <span className={`${style.description}`}>
                    {cart.description}
                  </span>
                </div>

                <div className={`${style["list-orders-item-price"]} `}>
                  <span>${cart.price}</span>
                </div>
                <div className={`${style["list-orders-item-quantity"]}  `}>
                  <div className={style["list-orders-item-up-down"]}>
                    <span
                      className={style["quantity-change"]}
                      onClick={() => {
                        decrease(cart.id);
                      }}
                    >
                      -
                    </span>
                    <span className={style["quantity"]}>{cart.quantity}</span>
                    <span
                      className={style["quantity-change"]}
                      onClick={() => {
                        increase(cart.id);
                      }}
                    >
                      +
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      handleDelete(cart.id);
                    }}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}

            <div className={style["list-orders-total"]}>
              <span className={style["total-left"]}>Total: </span>
              <span className={style["total-right"]}>${total}</span>
            </div>
          </div>
          <div className={style["select-payment"]}>
            <h3>Select Method Payment</h3>
            <form>
              <input
                type="radio"
                id="visa"
                name="payMethod"
                value="Visa"
                onChange={handleChange}
              />
              <label htmlFor="visa">Visa</label>
              <input
                type="radio"
                id="master"
                name="payMethod"
                value="Master"
                onChange={handleChange}
              />
              <label htmlFor="master">Master Cart</label>
              <input
                type="radio"
                id="cod"
                name="payMethod"
                value="Ship COD"
                onChange={handleChange}
              />
              <label htmlFor="cod">Ship COD</label>
            </form>
          </div>
          <div className={style.checkout}>
            <span onClick={handlePayment}>Purchase</span>
          </div>
        </div>
      ) : (
        <div className={style["no-cart"]}>
          <div className={style["no-cart-img"]}>
            <img src="../images/no-cart/null-gio-hang.png" />
          </div>
          <div className={style["no-cart-title"]}>
            <p>There are no products in your cart</p>
          </div>
          <Link to="/">SHOP NOW</Link>
        </div>
      )}
    </div>
  );
}

export default Cart;
