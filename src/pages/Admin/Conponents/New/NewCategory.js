import React, { useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import style from "./New.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosClient from "API/api.config";

function NewCategory({ inputs, title, isFile,setLoading }) {
  const [info, setInfo] = useState({});
  const [file, setFile] = useState(null);
  const nav = useNavigate();

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInfo((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleCreateCategory = async (e) => {
    setLoading(true)
    e.preventDefault();
    const newCategory = {
      name: info.name,
    };
    try {
      const data  = await axiosClient.post(`/category`,newCategory);
      setLoading(false)
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      nav("/admin/category");
    } catch (error) {
      setLoading(false)
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
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt='scenes'
              />
            </div>
          )}
          <div className={style.right}>
            <form>
              {isFile && (
                <div className={style.formInput}>
                  <label htmlFor="file">
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
              )}

              {inputs.map((input, index) => (
                <div className={style.formInput} key={index}>
                  <label>{input.label}</label>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    name={input.name}
                    onChange={handleOnChange}
                  />
                </div>
              ))}
              <button type="submit" onClick={handleCreateCategory}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewCategory;
