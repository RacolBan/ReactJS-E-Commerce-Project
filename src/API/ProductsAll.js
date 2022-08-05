import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ProductsAll() {
  const login = JSON.parse(localStorage.getItem("login")) || null;
  const [productsAll, setProductsAll] = useState([]);
  const getProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/product/getAll");
      setProductsAll(data);
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
    productsAll:productsAll
  };
}

export default ProductsAll;
