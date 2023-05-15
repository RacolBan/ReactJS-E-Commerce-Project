import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "./api.config";

function ProductsLaptop() {
  const [productsLaptop, setProductsLaptop] = useState([]);
  const getProducts = async () => {
    try {
      const data = await axiosClient.get(
        `/product/category/laptop`,{
          params:{
            name: "laptop"
          }
        }
      );
      setProductsLaptop(data);
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
