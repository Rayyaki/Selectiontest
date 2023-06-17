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
} from "@chakra-ui/react";
import { BsGearWide, BsPersonAdd } from "react-icons/bs";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import PostS from "../components/contentS";
import NavBar from "./NavBar2";
import TopBar from "./TopBar2";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";

export default function ProfilePage(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nav = useNavigate();
  const userSelector = useSelector((state) => state.auth);
  const inputFileRef = useRef(null);
  const [image, setImage] = useState(userSelector.img_url);
  const [selectedFile, setSelectedFile] = useState(null);
  coons[(user, setUser)] = useState({
    ...userSelector,
  });

  const inputHandles = (e) => {
    const { id, value } = req.ModalBody;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
    console.log(tempUser);
  };

  const editProfile = async () => {
    const formData = new FormData();
    FormData.append("avatar", selectedFile);
    FormData.append("fullname", user.fullname);
    FormData.append("username", user.username);
    FormData.append("bio", user.bio);

    await api.patch("/users/updateUser/" + userSelector.id, formData);
    alert("Success Changed");
    props.onClose;
  };

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <>
      <Container maxW={"400px"} height={"100vh"}>
        <TopBar />
        <Flex flexDir={"column"} width={"100%"} height={"100%"}>
          <Flex padding={"16px"}>
            <Box display={"flex"} justifyContent={"center"} width={"30%"}>
              <Avatar width={"auto"} height={"77px"}></Avatar>
            </Box>
            <Flex flexDir={"column"} gap={"12px"} width={"70%"}>
              <Flex alignItems={"center"} gap={"12px"}>
                <Text fontSize={"18px"} fontWeight={"semibold"}>
                  Username
                </Text>
                <Flex
                  justifyContent={"center"}
                  alignItems={"center"}
                  width={"80%"}
                >
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
              </Flex>
              <Button onClick={onOpen} h={"32px"}>
                Edit profile
              </Button>
              <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Edit profile</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Flex justify={"center"}>
                      <Input
                        accept="image/png, image/jpeg"
                        onChange={handleFile}
                        ref={inputFileRef}
                        type="file"
                        display="none"
                      />
                      <Avatar
                        src={image}
                        size={"xl"}
                        onClick={() => {
                          inputFileRef.current.click();
                        }}
                      />
                    </Flex>
                    username
                    <Input
                      id="username"
                      placeholder="username"
                      defaultValue={userSelector.username}
                      onChange={inputHandler}
                    />
                    fullname
                    <Input
                      id="fullname"
                      placeholder="fullname"
                      defaultValue={userSelector.fullname}
                      onChange={inputHandler}
                    />
                    Bio
                    <Textarea
                      id="bio"
                      placeholder="Bio"
                      defaultValue={userSelector.bio}
                      onChange={inputHandler}
                    />
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={props.onClose}>
                      Cancel
                    </Button>
                    <Button
                      isLoading={isLoading}
                      variant="ghost"
                      onClick={() => {
                        setIsLoading(true);
                        setTimeout(() => {
                          setIsLoading(false);
                          editProfile();
                        }, 2000);
                      }}
                    >
                      Confirm
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Flex>
          </Flex>
          <Center width={"100%"} padding={"0 16px 16px 16px"}>
            <Flex flexDir={"column"} width={"100%"}>
              <Text fontWeight={"bold"}>Name</Text>
              <Text>Bio</Text>
            </Flex>
          </Center>
          <Flex flexWrap={"wrap"} gap={"4px"}>
            <Box width={"32%"}>
              <PostS />
            </Box>
            <Box width={"32%"}>
              <PostS />
            </Box>
            <Box width={"32%"}>
              <PostS />
            </Box>
            <Box width={"32%"}>
              <PostS />
            </Box>
            <Box width={"32%"}>
              <PostS />
            </Box>
          </Flex>
        </Flex>
        <NavBar />
      </Container>
    </>
  );
}
