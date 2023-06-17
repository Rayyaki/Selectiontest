import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { api } from "../api/api";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  async function get() {
    try {
      const token = JSON.parse(localStorage.getItem("auth"));
      console.log(token);
      if (token) {
        const id = await api.get("/users/token", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        await api
          .get("/users", {
            params: {
              id: id.data.id,
            },
          })
          .then((res) => {
            console.log(res.data.Users);
            dispatch({
              type: "login",
              payload: res.data.Users[0],
            });
          });
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    get();
  }, []);
  return <>{children}</>;
}
