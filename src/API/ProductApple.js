import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ProductsApple() {
  const [productsApple, setProductsApple] = useState([]);
  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/product/category/2`
      );
      setProductsApple(res.data);
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
    productsApple: [productsApple, setProductsApple],
  };
}

export default ProductsApple;
