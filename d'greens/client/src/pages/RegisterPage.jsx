import "../css/regin.css";
import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Image,
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
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useFormik } from "formik";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const nav = useNavigate();
  YupPassword(Yup);
  const formik = useFormik({
    initialValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
    },

    validationSchema: Yup.object().shape({
      name: Yup.string().required("Required..!!"),
      email: Yup.string()
        .required("Required..!!")
        .email("Invalid..!! Written like example@email.com"),
      password: Yup.string()
        .required("Required..!!")
        .min(8, "Your password is too short.")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
          "Password should including an uppercase letter, symbol, number"
        ),
      password2: Yup.string()
        .required("Required..!!")
        .oneOf([Yup.ref("password"), null], "The Password don't match"),
    }),

    onSubmit: async () => {
      const { name, email, password } = formik.values;
      const account = { email, name, password };

      const checkEmail = await api
        .get("/users/GBE", { params: { email: account.email } })
        .then((res) => {
          // console.log(res);
          if (res.data) {
            return true;
          } else {
            return false;
          }
        });
      console.log(checkEmail);

      const checkName = await api
        .get("/users/GBN", { params: { name: account.name } })
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            return true;
          } else {
            return false;
          }
        });
      console.log(checkName);

      if (checkName) {
        return alert("Name already used");
      } else if (checkEmail) {
        return alert("Email already used");
      } else {
        await api.post("/users", account).then((res) => {
          nav("/login");
        });
      }
    },
  });

  function inputHandler(event) {
    const { value, id } = event.target;
    formik.setFieldValue(id, value);
    console.log(formik.values);
  }

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
                placeholder="User Name"
                id="name"
                h={"10%"}
                w={"80%"}
                borderRadius={"10px"}
                border={"2px double #1ef701fd"}
                onChange={inputHandler}
              ></Input>
              <Flex
                fontSize={"12px"}
                color={"red"}
                gap={"10px"}
                display={formik.errors.name ? "flex" : "none"}
                bgColor={"black"}
                borderRadius={"5px"}
              >
                <Box>
                  <Icon as={TbAlertCircleFilled} w={"10px"} h={"10px"} />
                </Box>
                {formik.errors.name}
              </Flex>
              <Input
                className="bgInput"
                type="text"
                placeholder="Email"
                id="email"
                h={"10%"}
                w={"80%"}
                borderRadius={"10px"}
                border={"2px double #1ef701fd"}
                onChange={inputHandler}
              ></Input>
              <Flex
                fontSize={"12px"}
                color={"red"}
                gap={"10px"}
                display={formik.errors.email ? "flex" : "none"}
                bgColor={"black"}
                borderRadius={"5px"}
              >
                <Box>
                  <Icon as={TbAlertCircleFilled} w={"10px"} h={"10px"} />
                </Box>
                {formik.errors.email}
              </Flex>

              <InputGroup h={"10%"} w={"80%"} borderRadius={"10px"}>
                <Input
                  className="bgInput"
                  type={seePassword ? "text" : "password"}
                  placeholder="password"
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
                fontSize={"12px"}
                color={"red"}
                gap={"10px"}
                display={formik.errors.password ? "flex" : "none"}
                bgColor={"black"}
                borderRadius={"5px"}
              >
                <Box>
                  <Icon as={TbAlertCircleFilled} w={"10px"} h={"10px"} />
                </Box>
                {formik.errors.password}
              </Flex>

              <InputGroup h={"10%"} w={"80%"} borderRadius={"10px"}>
                <Input
                  className="bgInput"
                  type={seePassword ? "text" : "password"}
                  placeholder="Comfirm Your Password"
                  id="password2"
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
                fontSize={"12px"}
                color={"red"}
                gap={"5px"}
                display={formik.errors.password2 ? "flex" : "none"}
                bgColor={"black"}
                borderRadius={"5px"}
              >
                <Box>
                  <Icon as={TbAlertCircleFilled} w={"10px"} h={"10px"} />
                </Box>
                {formik.errors.password2}
              </Flex>

              <Flex h={"10%"} w={"80%"} mt={"5%"}>
                <Flex
                  className="bgBtn"
                  onClick={formik.handleSubmit}
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
                  R E G I S T E R
                </Flex>
              </Flex>
              <Flex
                fontSize={"100%"}
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
                <a href="/login" color="red">
                  L O G I N
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
