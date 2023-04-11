/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import style from "./List.module.css";
import { toast } from "react-toastify";
import axiosClient from "API/api.config";

function ListProducts({ columns, title,setLoading }) {
  const login = JSON.parse(localStorage.getItem("login")) || null;

  const [productsAll, setProductsAll] = useState([]);
  const [isDlt,setIsDlt]= useState(false)
  const getProducts = async () => {
    if (login) {
      try {
        const { data } = await axiosClient.get(`/product/getAll`);
        setProductsAll(data)
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, [isDlt]);

  const nav = useNavigate();
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className={style.cellAction}>
            <Link
              to={`view/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className={style.viewButton}>Update</div>
            </Link>
            <div
              className={style.deleteButton}
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  const handleDelete = async (id) => {
    setLoading(true)
    try {
      const { data } = await axiosClient.delete(`/product/${id}`);
      setLoading(false)
      setIsDlt(!isDlt)
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      return nav("/admin/products");
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div className={style["list"]}>
      <div className={style["list-head"]}>
        <div className={style["list-head-title"]}>{title}</div>
        <Link to="new" className={style["list-head-link"]}>
          Add New
        </Link>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={productsAll}
          columns={columns.concat(actionColumn)}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default ListProducts;
