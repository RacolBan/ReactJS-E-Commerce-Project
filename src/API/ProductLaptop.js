import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ProductsLaptop() {
  const [productsLaptop, setProductsLaptop] = useState([]);
  const getProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/product/category/1"
      );
      setProductsLaptop(res.data);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return {
    productsLaptop: [productsLaptop, setProductsLaptop],
  };
}

export default ProductsLaptop;
