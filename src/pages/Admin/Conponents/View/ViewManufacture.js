/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import style from "./New.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "API/api.config";

function ViewManufacture({ title, isFile, setLoading }) {
  const param = useParams();
  const [name, setName] = useState("");
  const [file, setFile] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    const getData = async () => {
      
      try {
        const { data } = await axiosClient.get(`/manufacture/${param.id}`);
        setName(data.manufacturer.name);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    getData();
  }, []);
  const manufactureUpdate = {
    name,
  };
  const handleUpdate = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await axiosClient.put(`/manufacture/${param.id}`,manufactureUpdate);
      setLoading(false);
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      return nav("/admin/manufacture");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div className={style.new}>
      <div className={style.newContainer}>
        <div className={style.top}>
          <h1>{title}</h1>
        </div>
        <div className={style.bottom}>
          {isFile && (
            <div className={style.left}>
              <img
                src={
                  file
                    ? `${file}`
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt="images"
              />
            </div>
          )}
          <div className={style.right}>
            <form>
              <div className={style.formInput}>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
              </div>

              <button type="submit" onClick={handleUpdate}>
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewManufacture;
