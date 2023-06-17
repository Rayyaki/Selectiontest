import { Flex, Image } from "@chakra-ui/react";
import logo from "../assets/logo/brandgreen.png";

export default function SideBar() {
  return (
    <Flex
      h={"100vh"}
      w={"13%"}
      position={"absolute"}
      zIndex={"4"}
      border={"1px solid black"}
    ></Flex>
  );
}
