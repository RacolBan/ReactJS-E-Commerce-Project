import axiosClient from "API/api.config";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GlobalState } from "../GlobalState";


function UsersAll() {
  const state = useContext(GlobalState);
  const isAdmin = state.UserAPI.isAdmin;
  // const login = JSON.parse(localStorage.getItem("login")) || null;
  const [usersAll, setUsersAll] = useState([]);
  const getUsers = async () => {
    try {
      const { data } = await axiosClient.get(`/user/getAll`);
      setUsersAll(data);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    if (isAdmin) {
      getUsers();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);
  return {
    usersAll: [usersAll, setUsersAll],
  };
}

export default UsersAll;
