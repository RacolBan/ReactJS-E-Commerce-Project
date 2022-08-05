import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import { toast} from "react-toastify";

function Login({setLoading}) {
  const state = useContext(GlobalState);
  const nav = useNavigate()
  const [isLogged, setIsLogged] = state.UserAPI.isLogged;
  const [isAdmin,setIsAdmin] = state.UserAPI.isAdmin;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const user = {
    username: username,
    password: password,
  };

  const loginSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8000/account/login", {
        ...user,
      });
      const login = {
        accesstoken: data.accesstoken,
        accountId: data.id,
        username: data.username,
        avatar: null,
        role:data.role,
        userId:data.userId
      };

      localStorage.clear();
      localStorage.setItem("login", JSON.stringify(login));
      if (data.role === 0) {
        setIsLogged(true);
        setIsAdmin(true)
        setLoading(false)
        toast.success("Login successfully !", {
          position: toast.POSITION.TOP_CENTER
        });
        return nav("/admin");
        
      } else {
        setIsLogged(true);
        setLoading(false)
        toast.success("Login successfully !", {
          position: toast.POSITION.TOP_CENTER
        });
        return nav("/");
        
      }
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };
  return (
    <div className={style.container}>
      
      <form id={style.login} onSubmit={loginSubmit}>
        <div className={style.header}>
          <h3>Login</h3>
        </div>

        <div className={style.inputs}>
          <input
            type="username"
            placeholder="Username"
            name="username"
            id="username"
            autoFocus
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            spellCheck="false"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            spellCheck="false"
          />

          <button type="submit" id={style.submit}>
            Login
          </button>
          <Link to="/forgot" className={style["forgot-password"]}>
            Forgot Password
          </Link>

          <div className={style.lastLogin}>
            <p>
              Not yet member?<Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
