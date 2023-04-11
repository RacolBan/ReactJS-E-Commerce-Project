import React from "react";
import Laptop from "../../components/Category/Laptop/Laptop";
import Slider from "../../components/Slider/Slider";
import style from "./Home.module.css";
import Apple from "../../components/Category/Apple/Apple";
import CategoryProduct from "../../components/Category/Category";

function Home({categoryList, handleAddProducts}) {
  return (
    <div className={style.container}>
      <CategoryProduct categoryList={categoryList}/>
      <Slider />
      <Laptop handleAddProducts={handleAddProducts}/>
      <Apple handleAddProducts={handleAddProducts}/>
    </div>
  );
}

export default Home;
