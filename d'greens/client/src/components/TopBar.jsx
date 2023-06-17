import { Box, Center, Flex, Image, Input } from "@chakra-ui/react";
import logo from "../assets/logo/brandnew2.png";

export default function TopBar() {
  return (
    <>
      <Center
        w={"100vw"}
        h={"60px"}
        bgColor={"black"}
        // justifyContent={"center"}
        position={"fixed"}
        zIndex={"1"}
        top={"0"}
      >
        <Flex
          bgColor={"black"}
          maxW={"500px"}
          width={"100%"}
          height={"60px"}
          position={"sticky"}
          display={"flex"}
          justifyContent={"space-evenly"}
          padding={" 3px 0"}
          alignItems={"center"}
        >
          <Image w={"38%"} h={"90%"} src={logo} />
          <Input
            w={"40%"}
            h={"50%"}
            color={"green"}
            fontWeight={"bolder"}
            placeholder="SEARCH"
          ></Input>
        </Flex>
      </Center>
    </>
  );
}
