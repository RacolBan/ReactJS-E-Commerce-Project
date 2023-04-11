/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import style from "./New.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast} from "react-toastify";
import axiosClient from "API/api.config";

function ViewUser({ title, isFile,setLoading }) {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const param = useParams();
  const nav = useNavigate()


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axiosClient.get(`/user/${param.id}/getInfor/admin`);
        if (data.User) {
          setUsername(data.User.username);
          setFirstName(data.User.firstName);
          setLastName(data.User.lastName);
          setAddress(data.User.address);
          setEmail(data.User.email);
          setPhone(data.User.phone);
          setFile(data.User.avatar);
          setRole(data.User.role);
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    };
    getData();
  }, []);
  const userUpdate = {
    firstName,
    lastName,
    address,
    role,
  };
  const handleUpdate = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const { data } = await axiosClient.put(`/user/${param.id}/updateInfor/admin`,userUpdate);
      setLoading(false)
      toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER
      });
      return nav('/admin/users')
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
                    ? `${file}`
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt="images"
              />
            </div>
          )}
          <div className={style.right}>
            <form>
              {/* {isFile && (
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
                    disabled
                  />
                </div>
              )} */}

              <div className={style.formInput}>
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  name="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                  disabled
                />
              </div>
              <div className={style.formInput}>
                <label>Firstname</label>
                <input
                  type="text"
                  placeholder="Enter Firstname"
                  name="firstName"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  value={firstName}
                />
              </div>
              <div className={style.formInput}>
                <label>Lastname</label>
                <input
                  type="text"
                  placeholder="Enter Lastname"
                  name="lastName"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  value={lastName}
                />
              </div>
              <div className={style.formInput}>
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Enter Address"
                  name="address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  value={address}
                />
              </div>
              <div className={style.formInput}>
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  disabled
                />
              </div>
              <div className={style.formInput}>
                <label>Phone</label>
                <input
                  type="text"
                  placeholder="Enter Phone"
                  name="phone"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  value={phone}
                  disabled
                />
              </div>
              <div className={style.formInput}>
                <label>Role</label>
                <input
                  type="text"
                  placeholder="Enter Role"
                  name="role"
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  value={role}
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

export default ViewUser;
