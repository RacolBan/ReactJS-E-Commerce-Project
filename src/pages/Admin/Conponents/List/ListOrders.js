/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import style from "./List.module.css";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import OrderDetail from "./OrderDetail";
import axiosClient from "API/api.config";

function ListOrders({ columns, title }) {
  const [orders, setOrders] = useState([]);
  const login = JSON.parse(localStorage.getItem("login")) || null;

  const getOrder = async () => {
    if (login) {
      try {
        const  data  = await axiosClient.get(`/order`);
        console.log(data)
        setOrders(data);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  useEffect(() => {
    getOrder();
  }, []);
  const actionColumn = [
    {
      field: "detail",
      headerName: "Detail",
      width: 100,
      renderCell: (params) => {
        return (
          <div className={style.cellAction}>
            <Popup
              modal
              trigger={<div className={style.viewButton}>Detail</div>}
            >
              {(close) => <OrderDetail close={close} id={params.row.id} />}
            </Popup>
          </div>
        );
      },
    },
  ];

  return (
    <div className={style["list"]}>
      <div className={style["list-head"]}>
        <div className={style["list-head-title"]}>{title}</div>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={orders}
          columns={columns.concat(actionColumn)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default ListOrders;
