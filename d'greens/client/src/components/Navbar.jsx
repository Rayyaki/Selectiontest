import {
  Avatar,
  Box,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Flex,
  Input,
  Center,
  Image,
  useToast,
} from "@chakra-ui/react";
import { RiAddBoxLine } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { api } from "../api/api";

export default function Navbar() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  const userSelector = useSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nav = useNavigate();
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState(null);
  const [posting, setPosting] = useState({
    caption: "",
  });

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempOst = { ...posting };
    tempOst[id] = value;
    setPosting(tempOst);
    console.log(tempOst);
  };

  const uploadPost = async () => {
    try {
      const formData = new FormData();
      formData.append("Imagepo", selectedFile);
      formData.append("caption", posting.caption);
      formData.append("user_id", userSelector.id);
      console.log(selectedFile);
      if (selectedFile) {
        return await api.post("/post", formData).then(() => {
          toast({
            position: "top",
            title: "post",
            description: "Your posting is successful",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setPosting({ caption: "" });
          setSelectedFile("");
          onClose();
          nav("/home");
        });
      }
      toast({
        position: "top",
        title: "post",
        description: "Your posting is failed",
        status: "Eroor",
        duration: 3000,
        isClosable: true,
      });
      setPosting({ caption: "" });
      setSelectedFile("");
      onClose();
      nav("/home");
    } catch (error) {
      console.log(error.message);
    }
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
    <Box
      bgColor={"black"}
      width={"100%"}
      height={"38px"}
      bottom={"0"}
      left={"0"}
      position={"fixed"}
      display={"flex"}
      justifyContent={"center"}
      // pl={"10%"}
      // pr={"20px"}
      // padding={" 3px 0"}
      // maxW={"500px"}
      // minW={"100px"}
      color={"white"}
    >
      <Flex
        justifyContent={"space-around"}
        maxW={"500px"}
        w={"100%"}
        ml={"1.2%"}
        position={"fixed"}
        minW={"100px"}
        alignItems={"center"}
      >
        <Icon
          onClick={() => nav("/home")}
          fontSize={"200%"}
          height={"100%"}
          as={AiFillHome}
          // ml={"10%"}
          color={"white"}
        ></Icon>
        <Icon
          fontSize={"200%"}
          height={"100%"}
          as={RiAddBoxLine}
          onClick={onOpen}
          color={"white"}
        ></Icon>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay>
            <ModalContent>
              <ModalHeader>New Post</ModalHeader>
              <ModalCloseButton />

              <ModalBody>
                <Flex flexDir={"column"} color={"white"} gap={"5px"}>
                  <Flex flexDir={"column"} gap={"5px"}>
                    <Image w={"150px"} h={"150px"} src={image}></Image>
                    <Input
                      type="file"
                      accept="image/png, image/jpg, image/jpeg"
                      display={"none"}
                      ref={fileRef}
                      onChange={fileHandler}
                    ></Input>
                    <Button
                      onClick={() => {
                        fileRef.current.click();
                      }}
                    >
                      Choose file
                    </Button>
                  </Flex>
                  <Flex>
                    <Input
                      color={"black"}
                      fontWeight={"bolder"}
                      type="text"
                      id="caption"
                      placeholder="Caption"
                      onChange={inputHandler}
                    ></Input>
                  </Flex>
                </Flex>
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue" mr={3} onClick={uploadPost}>
                  Post
                </Button>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        </Modal>
        <Avatar
          onClick={() => nav("/profile")}
          // mr={"10%"}
          h={"80%"}
          w={"6%"}
          alignItems={"center"}
          src={userSelector.img_url}
        ></Avatar>
      </Flex>
    </Box>
  );
}
