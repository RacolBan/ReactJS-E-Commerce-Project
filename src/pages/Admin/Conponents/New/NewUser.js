import React, { useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import style from "./New.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function NewUser({ inputs, title, isFile,setLoading }) {
  const nav = useNavigate();
  const [info, setInfo] = useState({});
  const [file, setFile] = useState(null);

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

  const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isPhone = regexPhone.test(info.phone);
  const isMail = regexEmail.test(info.email);

  const handleCreateUser = async (e) => {
    setLoading(true)
    e.preventDefault();
    if (!isMail) {
      setLoading(false)
      toast.error("Email invalid", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (!isPhone) {
      setLoading(false)
      toast.error("Phone invalid", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (info.password !== info.confirmPassword) {
      setLoading(false)
      toast.error("Password and Confirm Password does not match.", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    let newUser = new FormData();
    if (info) {
      newUser.append("file", file);
      newUser.append("firstName", info.firstName);
      newUser.append("lastName", info.lastName);
      newUser.append("email", info.email);
      newUser.append("address", info.address);
      newUser.append("phone", info.phone);
      newUser.append("username", info.username);
      newUser.append("password", info.password);
    }

    try {
      const { data } = await axios({
        method: "post",
        url: `${process.env.REACT_APP_SERVER_URL}/user/accounts/createProfile/admin`,
        data: newUser,
        headers: {
          "Content-Type": "multipart/form-data",
          "access-token":
            "Bearer " + JSON.parse(localStorage.getItem("login")).accesstoken,
        },
      });
      setLoading(false)
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      return nav("/admin/users");
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
                alt="image"
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
              <button type="submit" onClick={handleCreateUser}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewUser;
