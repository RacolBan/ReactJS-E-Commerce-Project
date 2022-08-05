import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import style from "./List.module.css";
import { toast } from "react-toastify";
import axios from "axios";

function ListOrders({ columns, title,setLoading }) {
  
  const [orders, setOrders] = useState([]);
  const login = JSON.parse(localStorage.getItem("login")) || null;

  const getManufacture = async () => {
    if (login) {
      setLoading(true)
      try {
        const { data } = await axios.get("http://localhost:8000/order", {
          headers: { "access-token": "Bearer " + login.accesstoken },
        });
        setLoading(false)
        setOrders(data);
      } catch (error) {
        setLoading(false)
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  useEffect(() => {
    getManufacture();
  }, []);
  
  
  return (
    <div className={style["list"]}>
      <div className={style["list-head"]}>
        <div className={style["list-head-title"]}>{title}</div>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={orders}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default ListOrders;
