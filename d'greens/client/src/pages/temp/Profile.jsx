import { Box, Center, Flex, useMediaQuery } from "@chakra-ui/react";
import NavBar from "../components/NavBar2";
import Profilecom from "../components/profilecom";
import { useEffect } from "react";

export default function Account() {
  return (
    <Center w={"100vw"} h={"100vh"}>
      <Flex
        // paddingTop={"48px"}
        w={"100%"}
        h={"100%"}
        maxW={"500px"}
        maxH={"600px"}
        justifyContent={"center"}
        flexDir={"column"}
        alignItems={"center"}
      >
        <Profilecom />
        <NavBar />
      </Flex>
    </Center>
  );
}
