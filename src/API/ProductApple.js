import axiosClient from "API/api.config";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ProductsApple() {
  const [productsApple, setProductsApple] = useState([]);
  const getProducts = async () => {
    try {
      const data = await axiosClient.get('/product/category',{
        params:{
          category1: 'mouse',
          category2: 'keyboard'
        }});
      setProductsApple(data);
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
