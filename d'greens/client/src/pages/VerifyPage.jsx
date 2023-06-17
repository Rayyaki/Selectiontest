import { Box, Button, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyPage() {
  const nav = useNavigate();
  const { token } = useParams();
  // console.log(token);

  //   useEffect(() => {
  const verifyUser = async () => {
    try {
      // alert(token);
      await api.patch(`/users/verify`, { token });
      alert("Verification success");
      nav("/login");
    } catch (err) {
      console.log(err);
      alert("Verification was not successful, please try again");
    }
  };
  //   verifyUser();
  //   }, [token]);
  return (
    <Flex
      h={"100vh"}
      w={"100vw"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      //   bgColor={"#2f312b"}
      bgColor={"black"}
    >
      <Flex
        position={"relative"}
        zIndex={"2"}
        maxW={"600px"}
        maxH={"400px"}
        h={"100%"}
        w={"100%"}
        border={"3px double green"}
        borderRadius={"20px"}
        flexDir={"column"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Flex color={"green"} fontSize={"large"} fontWeight={"bolder"}>
          Press the button to verify you account
        </Flex>
        <Button
          w={"20%"}
          bgColor={"green"}
          color={"black"}
          fontWeight={"bolder"}
          onClick={verifyUser}
        >
          {" "}
          V E R I F Y
        </Button>
      </Flex>
    </Flex>
  );
}
