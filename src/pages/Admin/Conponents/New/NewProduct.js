import React, { useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import style from "./New.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "API/api.config";

function NewProduct({ inputs, title, isFile,setLoading }) {
  const [info, setInfo] = useState({});
  const [file, setFile] = useState(null);
  const nav = useNavigate()

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
  const handleCreateProduct = async (e) => {
    setLoading(true)
    e.preventDefault();
    let newProduct = new FormData();

    newProduct.append("file", file);
    newProduct.append("name", info.name);
    newProduct.append("price", info.Price);
    newProduct.append("description", info.Description);
    newProduct.append("nameManufacture", info.manufacture);
    newProduct.append("nameCategory", info.category);
    try {
      const {data} = await axiosClient.post(`/product`,newProduct);
      setLoading(false)
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER
      });
      return nav('/admin/products')
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER
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
                alt="images"
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
              <button type="submit" onClick={handleCreateProduct}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;
