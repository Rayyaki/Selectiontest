import { Button, Center, Flex } from "@chakra-ui/react";

export default function InfoVerify() {
  return (
    <>
      <Flex
        w={"100%"}
        h={"50px"}
        maxH={"50px"}
        flexDir={"row"}
        justifyContent={"center"}
        // mt={"40%"}
        position={"absolute"}
        zIndex={"25"}
      >
        <Flex
          bgColor={"yellow"}
          h={"100%"}
          w={"40%"}
          flexDir={"column"}
          justifyContent={"center"}
          color={"black"}
          fontWeight={"bolder"}
          textAlign={"center"}
          borderRadius={"10px"}
        >
          Your account has not been verified!! check your email.
        </Flex>
      </Flex>
    </>
  );
}
