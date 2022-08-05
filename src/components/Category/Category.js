import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Category.module.css";

function CategoryProduct({ categoryList }) {
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 106) {
        setScroll(true);
      }
      else {
        setScroll(false);
      }
    });
  }, [scroll]);
  return (
    <div
      className={
        scroll
          ? `l-10 ${style["scroll-header-menu"]}`
          : `l-10 ${style["header-menu"]}`
      }
    >
      <div className="row no-gutters">
        <div className={style.menu}>
          <div className={style["menu-left"]}>
            <i className="fas fa-bars"></i>
            Category
          </div>
          <div className={style["menu-nav"]}>
            <ul className={style["menu-list"]}>
              {categoryList?.map((item, index) => (
                <li className={style["menu-item"]} key={item.id}>
                  <img src={`./images/Icon/${index + 1}.png`} alt="icon" />
                  <Link to={`/category/${item.id}`}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryProduct;
