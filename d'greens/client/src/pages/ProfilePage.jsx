import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BsGearWide, BsPersonAdd } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import Navbar from "../components/Navbar";
import CardProfile from "../components/CardProfile";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { api } from "../api/api";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();
  const inputFileRef = useRef(null);
  const [image, setImage] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [profile, setProfile] = useState({
    username: "",
    name: "",
    bio: "",
  });

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempPro = { ...profile };
    tempPro[id] = value;
    setProfile({ ...profile, ...tempPro });
    console.log(profile);
  };

  const updatePro = async () => {
    try {
      const formData = new FormData();
      formData.append("Avatar", selectedFile);
      formData.append("name", profile.name);
      formData.append("username", profile.username);
      formData.append("bio", profile.bio);

      console.log(formData.get("name"));
      console.log(formData.get("username"));
      console.log(formData.get("bio"));
      console.log(formData.get("Avatar"));

      const result = await api.patch("/users/" + userSelector.id, formData);
      toast({
        position: "top",
        colorScheme:
          result.data == "username already been used" ||
          result.data.message == "No fields to update"
            ? "red"
            : "cyan",
        title: "Edit Profile",
        description:
          result.data == "username already been used" ||
          result.data.message == "No fields to update"
            ? result.data
            : "Edit Success",
        status:
          result.data == "username already been used" ||
          result.data.message == "No fields to update"
            ? "error"
            : "success",
        duration: 3000,
        isClosable: true,
      });

      dispatch({
        type: "login",
        payload: result.data,
      });

      setSelectedFile("");
      onClose();
      nav("/profile");
    } catch (error) {
      console.log(error.message);
    }
    console.log(userSelector.img_url);
  };

  const fileHandler = (e) => {
    const file = e.target.files[0];

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Container maxW={"500px"} height={"100vh"} ml={"32.3%"}>
        <Flex flexDir={"column"} width={"100%"} height={"100%"}>
          <Flex
            height={"44px"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Icon w={"24px"} h={"24px"} as={BsGearWide}></Icon>
            <Flex justifyContent={"center"} alignItems={"center"} width={"80%"}>
              <Box fontWeight={"semibold"} bgColor={"whiteAlpha.400"}>
                {userSelector.username}
              </Box>

              <Menu>
                <MenuButton display={"flex"}>
                  <Icon
                    cursor={"pointer"}
                    w={"24px"}
                    h={"24px"}
                    as={MdKeyboardArrowDown}
                  ></Icon>
                </MenuButton>

                <MenuList>
                  <MenuItem
                    color={"red"}
                    onClick={() => {
                      localStorage.removeItem("auth");
                      nav("/login");
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
            <Icon fontSize={"4xl"} as={BsPersonAdd}></Icon>
          </Flex>
          <Flex padding={"16px"}>
            <Box display={"flex"} justifyContent={"center"} width={"30%"}>
              <Avatar
                width={"60%"}
                height={"100%"}
                src={userSelector.img_url}
              ></Avatar>
            </Box>
            <Flex flexDir={"column"} gap={"12px"} width={"70%"}>
              <Flex alignItems={"center"} gap={"12px"}>
                <Text fontSize={"18px"} fontWeight={"semibold"}>
                  {userSelector.username}
                </Text>
                <Icon w={"24px"} h={"24px"} as={BsGearWide}></Icon>
              </Flex>
              <Button onClick={onOpen} h={"32px"}>
                Edit profile
              </Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                  <ModalContent>
                    <ModalHeader>Edit Profile</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                      <Flex flexDir={"column"}>
                        <Input
                          id="name"
                          placeholder="Full Name"
                          type={"text"}
                          onChange={inputHandler}
                          defaultValue={userSelector.name}
                        ></Input>
                        <Input
                          id="bio"
                          placeholder="Bio"
                          type="text"
                          onChange={inputHandler}
                          defaultValue={userSelector.bio}
                        ></Input>
                        <Input
                          id="username"
                          placeholder="username"
                          onChange={inputHandler}
                          defaultValue={userSelector.username}
                        ></Input>
                        <Input
                          accept="image/png, image/jpeg"
                          onChange={fileHandler}
                          ref={inputFileRef}
                          type="file"
                          display={"none"}
                        />
                        <Avatar
                          src={image}
                          size={"xl"}
                          onClick={() => {
                            inputFileRef.current.click();
                          }}
                        />
                      </Flex>
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="yellow" mr={3} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                        // variant="ghost"
                        colorScheme="blue"
                        onClick={updatePro}
                      >
                        Submit
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </ModalOverlay>
              </Modal>
            </Flex>
          </Flex>

          <Center width={"100%"} padding={"0 16px 16px 16px"}>
            <Flex flexDir={"column"} width={"100%"}>
              <Text fontWeight={"bold"}>{userSelector.name}</Text>
              <Text fontWeight={"bold"}>{userSelector.bio}</Text>
              {/* <Text>Bio</Text> */}
            </Flex>
          </Center>
          <Flex flexWrap={"wrap"} gap={"4px"}>
            <Box width={"32%"}>
              <CardProfile></CardProfile>
            </Box>
            <Box width={"32%"}>
              <CardProfile></CardProfile>
            </Box>
            <Box width={"32%"}>
              <CardProfile></CardProfile>
            </Box>
            <Box width={"32%"}>
              <CardProfile></CardProfile>
            </Box>
            <Box width={"32%"}>
              <CardProfile></CardProfile>
            </Box>
            <Box width={"32%"}>
              <CardProfile></CardProfile>
            </Box>
            <Box width={"32%"}>
              <CardProfile></CardProfile>
            </Box>
            <Box width={"32%"}>
              <CardProfile></CardProfile>
            </Box>
            <Box width={"32%"}>
              <CardProfile></CardProfile>
            </Box>
            <Box width={"32%"}>
              <CardProfile></CardProfile>
            </Box>
            <Box width={"32%"}>
              <CardProfile></CardProfile>
            </Box>
            <Box width={"32%"}>
              <CardProfile></CardProfile>
            </Box>
          </Flex>
        </Flex>
      </Container>
      <Navbar></Navbar>
    </>
  );
}
