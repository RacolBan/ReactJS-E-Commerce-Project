import axiosClient from "API/api.config";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


function ProductsAll() {
  
  const [productsAll, setProductsAll] = useState([]);
  const getProducts = async () => {
    try {
      const  data  = await axiosClient.get('/product/getAll');
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
