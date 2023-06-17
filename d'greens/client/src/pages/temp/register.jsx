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

// import { useDispatch } from "react-redux";
import Instagram_logo from "../assets/logo/logoText.svg";

export default function Register() {
  const nav = useNavigate();
  return (
    <>
      <Center>
        <Center
          w={"100vw"}
          h={"670px"}
          minW={"175px"}
          maxW={"400px"}
          // justifyContent={"space-between"}
          flexDir={"column"}
          border={"1px solid #e8e8e8"}
          marginTop={"10px"}
        >
          <Box>
            <Center>
              <Image
                w={"175px"}
                h={"60px"}
                src={Instagram_logo}
                marginTop={"30px"}
                // alignItems={"center"}
              />
            </Center>
            <Center>
              <Box textAlign={"center"}>
                Sign up to see photos and videos from your friends.
              </Box>
            </Center>

            <Center
              display={"flex"}
              flexDir={"column"}
              alignItems={"center"}
              marginTop={"10px"}
            >
              <Button
                borderRadius={"10px"}
                fontSize={"small"}
                width={"300px"}
                marginTop={"15px"}
                bgColor={"#4cb5f9"}
                color={"white"}
                mb={"10px"}
                gap={"5px"}
              >
                <AiFillFacebook />
                Login with Facebook
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
              <Center display={"flex"} flexDir={"column"} gap={"5px"}>
                <Input
                  width={"300px"}
                  fontSize={"small"}
                  placeholder="Mobile number or email address"
                  borderRadius={"none"}
                />
                <Input
                  width={"300px"}
                  fontSize={"small"}
                  placeholder="Full Name"
                  borderRadius={"none"}
                />
                <Input
                  width={"300px"}
                  fontSize={"small"}
                  placeholder="Username"
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
              </Center>
              <Box textAlign={"center"} mt={"10px"} fontSize={"small"}>
                People who use our service may have uploaded your contact
                information to Instagram. Learn more
              </Box>
              <Box textAlign={"center"} mt={"15px"}>
                By signing up, you agree to our Terms, Privacy Policy and
                Cookies Policy.
              </Box>

              <Button
                borderRadius={"10px"}
                fontSize={"small"}
                width={"300px"}
                marginTop={"15px"}
                bgColor={"#4cb5f9"}
                color={"white"}
              >
                Sign Up
              </Button>
            </Center>
          </Box>
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
          <Box textAlign={"center"}>Have an account?</Box>
          <Box cursor={"pointer"} color={"#7bd7fc"} onClick={() => nav("/")}>
            Log in
          </Box>
        </Center>
      </Flex>
    </>
  );
}
