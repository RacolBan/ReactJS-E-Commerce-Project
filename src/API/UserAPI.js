import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "./api.config";

function UserAPI() {
  const [isLogged, setIsLogged] = useState(false);
  const login = JSON.parse(localStorage.getItem("login")) || null;
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({
    address: "",
    avatar: "",
    email: "",
    firstname: "",
    lastname: "",
    phone: "",
    username: "",
    userId: "",
  });
  useEffect(() => {
    if (login) {
      const getUser = async () => {
        try {
          const data  = await axiosClient.get(`/user/${login.accountId}/getInfor`);
          console.log(data)
          if (data.inforUser.avatar === null) {
            setUser({
              address: data.inforUser.address,
              avatar: login.avatar,
              email: data.inforUser.email,
              firstname: data.inforUser.firstName,
              lastname: data.inforUser.lastName,
              phone: data.inforUser.phone,
              username: login.username,
              accountId: login.accountId,
              accesstoken: login.accesstoken,
              userId: data.inforUser.id,
              role: login.role,
            });
          } else {
            setUser({
              address: data.inforUser.address,
              avatar: data.inforUser.avatar,
              email: data.inforUser.email,
              firstname: data.inforUser.firstName,
              lastname: data.inforUser.lastName,
              phone: data.inforUser.phone,
              username: login.username,
              accountId: login.accountId,
              accesstoken: login.accesstoken,
              userId: data.inforUser.id,
              role: login.role,
            });
          }
          setIsLogged(true)
          if (login.role === 0) {
            setIsAdmin(true);
            setIsLogged(true);
          }
        } catch (error) {
          localStorage.clear();
          toast.error("session out, please login again", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      };
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);
  return {
    isLogged: [isLogged, setIsLogged],
    user: [user, setUser],
    isAdmin: [isAdmin, setIsAdmin],
  };
}

export default UserAPI;
