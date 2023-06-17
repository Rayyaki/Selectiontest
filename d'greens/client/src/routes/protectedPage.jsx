import { Center, Image } from "@chakra-ui/react";
import { Children, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import loader from "../assets/logo/loadingdg3.gif";

export default function ProtectedPage({
  children,
  needLogin = false,
  guestOnly = false,
}) {
  const userSelector = useSelector((state) => state.auth);
  const user = userSelector;
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(userSelector);

    if (guestOnly && user?.email) {
      return nav("/home");
    } else if (needLogin && !user?.email) {
      return nav("/login");
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [userSelector]);

  return (
    <>
      {loading ? (
        <Center
          h={"100vh"}
          // maxW={"500px"}
          w={"100%"}
          bgColor={"black"}
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
        >
          <Image src={loader} />
        </Center>
      ) : (
        children
      )}
    </>
  );
}
