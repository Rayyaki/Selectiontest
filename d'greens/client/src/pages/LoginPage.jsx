import "../css/regin.css";
import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Image,
  Img,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import bgF from "../assets/logo/bggreen.jpg";
import bgregin from "../assets/logo/bgregin.jpg";
import brand from "../assets/logo/brandgreen.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { TbAlertCircleFilled } from "react-icons/tb";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import cp from "../assets/logo/CP3.png";

export default function LoginPage() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [user, setUser] = useState({
    emname: "",
    password: "",
  });

  function inputHandler(event) {
    const { value, id } = event.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
    console.log(tempUser);

    // if (id === "email") {
    //   // Periksa apakah nilai input adalah email atau nama
    //   if (value.includes("@")) {
    //     tempUser.email = value; // Jika nilai input adalah email
    //     tempUser.nama = ""; // Set nilai nama menjadi string kosong
    //   } else {
    //     tempUser.email = ""; // Set nilai email menjadi string kosong
    //     tempUser.nama = value; // Jika nilai input adalah nama
    //   }
    // } else {
    //   tempUser[id] = value;
    // }
  }

  const login = async () => {
    await api
      .post("/users/login", user)
      .then((res) => {
        console.log(res.data.token.token);
        if (res.data.token) {
          localStorage.setItem("auth", JSON.stringify(res.data.token.token));
          console.log(res);
          dispatch({
            type: "login",
            payload: res.data.value,
          });
          // console.log(res.data.value.role);

          console.log(res.data.value);
          if (res.data.value) {
            return nav("/home");
          }
        } else {
          throw new Error("Error in login"); // Buang "error" karena tidak digunakan
        }
      })
      .catch((err) => {
        console.log(err.message);
        alert("Email / Name / Password invalid");
      });
  };

  const [seePassword, setSeePassword] = useState(false);
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      h={"100vh"}
      w={"100vw"}
    >
      <Box
        position={"absolute"}
        zIndex={"0"}
        w={"100%"}
        h={"100%"}
        backgroundImage={bgF}
        filter={"blur(5px)"}
        bgSize={"cover"}
        bgRepeat={"no-repeat"}
      />
      <Center
        position={"relative"}
        flexDir={"column"}
        h={"600px"}
        w={"100vw"}
        minW={"50px"}
        maxW={"500px"}
        // border={"2px solid yellow"}
        boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
        borderRadius={"20px"}
        display={"flex"}
        backgroundImage={bgregin}
        filter={"-moz-initial"}
        bgSize={"cover"}
        bgRepeat={"no-repeat"}
      >
        <Flex
          h={"93%"}
          w={"93%"}
          border={"2px solid yellow "}
          borderRadius={"20px"}
        >
          <Flex flexDir={"column"} w={"100%"} gap={"1%"}>
            <Flex
              flexDir={"column"}
              alignItems={"center"}
              alignContent={"center"}
              // w={"70%"}
              h={"30%"}
              //   justifyContent={"center"}
            >
              <Image src={brand} w={"80%"} h={"100%"} />
            </Flex>
            <Flex
              flexDir={"column"}
              h={"80%"}
              gap={"3%"}
              alignContent={"center"}
              alignItems={"center"}
            >
              <Input
                className="bgInput"
                type="text"
                placeholder="Email / Username"
                id="emname"
                h={"10%"}
                w={"80%"}
                borderRadius={"10px"}
                border={"2px double #1ef701fd"}
                onChange={inputHandler}
              ></Input>

              <InputGroup h={"10%"} w={"80%"} borderRadius={"10px"}>
                <Input
                  className="bgInput"
                  type={seePassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  h={"90%"}
                  w={"100%"}
                  border={"2px double #1ef701fd"}
                  borderRadius={"10px"}
                  onChange={inputHandler}
                ></Input>
                <InputRightElement
                  // w={"5%"}
                  borderRadius={"10px"}
                  display={"flex"}
                  // mt={"1.5%"}
                >
                  <Icon
                    as={seePassword ? AiFillEye : AiFillEyeInvisible}
                    onClick={() => setSeePassword(!seePassword)}
                    color={"#2cff02"}
                    minW={"10px"}
                    minH={"10px"}
                    w={"80%"}
                    h={"50%"}
                  ></Icon>
                </InputRightElement>
              </InputGroup>

              <Flex
                h={"5%"}
                w={"30%"}
                right={"0"}
                color={"red"}
                alignItems={"center"}
                justifyContent={"center"}
                fontWeight={"bolder"}
              >
                {/* Change Password */}
              </Flex>

              <Flex h={"10%"} w={"80%"} mt={"8%"}>
                <Flex
                  // variant={"ghost"}
                  // className
                  fontSize={"30px"}
                  className="bgBtn"
                  onClick={login}
                  w={"100%"}
                  h={"100%"}
                  borderRadius={"10px"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  transition="box-shadow 0.2s"
                  _hover={{
                    boxShadow: "0px  0px 5px 10px #02ff178f",
                  }}
                >
                  L O G I N
                </Flex>
              </Flex>
              <Flex
                fontSize={"70%"}
                color={"#02ff178f"}
                fontWeight={"bolder"}
                bgColor={"black"}
                borderRadius={"10px"}
                w={"80%"}
                h={"10%"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                Do you have an account ? ||
                <a href="/register" color="red">
                  R E G I S T E R
                </a>
                ||
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Center>
    </Flex>
  );
}
