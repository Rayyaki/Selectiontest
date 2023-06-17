import {
  Box,
  Container,
  Button,
  Center,
  Flex,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Divider } from "@chakra-ui/react";
import { AiFillFacebook } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// import { useDispatch } from "react-redux";
import Instagram_logo from "../assets/logo/logoText.svg";

export default function Login() {
  const nav = useNavigate();
  return (
    <>
      <Center>
        <Center
          w={"100vw"}
          h={"400px"}
          minW={"175px"}
          maxW={"400px"}
          // justifyContent={"space-between"}
          flexDir={"column"}
          border={"1px solid #e8e8e8"}
          marginTop={"10px"}
        >
          <Image
            w={"175px"}
            h={"60px"}
            src={Instagram_logo}
            marginTop={"40px"}
          />
          <Center display={"flex"} flexDir={"column"} alignItems={"center"}>
            <Input
              width={"300px"}
              fontSize={"small"}
              placeholder="Phone number, username, or email address"
              borderRadius={"none"}
            />
            <Input
              type="password"
              placeholder="Password"
              borderRadius={"none"}
              fontSize={"small"}
              width={"300px"}
              marginTop={"5px"}
            />
            <Button
              borderRadius={"10px"}
              fontSize={"small"}
              width={"300px"}
              marginTop={"15px"}
              bgColor={"#4cb5f9"}
              color={"white"}
            >
              Masuk
            </Button>
            <Center marginBottom={"20px"}>
              <hr
                style={{
                  border: "1px solid rgb(203, 203, 203)",
                  width: "125px",
                  marginTop: "30px",
                }}
              />
              <span
                style={{
                  color: "black",
                  fontWeight: "450",
                  margin: "30px 10px 0 10px",
                  // display: "flex",
                  // justifyContent: "center",
                }}
              >
                OR
              </span>
              <hr
                style={{
                  border: "1px solid rgb(203, 203, 203)",
                  width: "125px",
                  marginTop: "30px",
                }}
              />
            </Center>
            <Center>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                color={"#455585"}
                gap={"5px"}
              >
                <AiFillFacebook /> Login with Facebook
              </Box>
            </Center>
            <Box>Forgot password?</Box>
          </Center>
        </Center>
      </Center>

      <Flex justifyContent={"center"}>
        <Center
          width={"400px"}
          height={"70px"}
          border={"1px solid #e8e8e8"}
          textAlign={"center"}
          mt={"10px"}
          gap={"5px"}
        >
          <Box textAlign={"center"}>Don't have an account?</Box>
          <Box
            cursor={"pointer"}
            color={"#7bd7fc"}
            onClick={() => nav("/register")}
          >
            Sign Up
          </Box>
        </Center>
      </Flex>
    </>
  );
}
