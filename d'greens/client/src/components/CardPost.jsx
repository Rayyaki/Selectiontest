import {
  Avatar,
  Box,
  Container,
  Flex,
  Icon,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdOutlineModeComment } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import { TbSend } from "react-icons/tb";
import { BsChat } from "react-icons/bs";
import { RxBookmark, RxBookmarkFilled } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function CardPost(props) {
  const userSelector = useSelector((state) => state.auth);
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <>
      <Container
        left={"0"}
        pt={"12%"}
        maxW={"700px"}
        minW={"100px"}
        w={"100%"}
        mb={"60px"}
        color={"white"}
        bgColor={"black"}
      >
        <Box w={"700"}>
          <Flex
            justifyContent={"space-between"}
            padding={"6px"}
            alignItems={"center"}
          >
            <Avatar
              width={"32px"}
              height={"32px"}
              src={props.val.User.img_url}
            ></Avatar>
            <Box width={"70%"}>{props.val.User.username}</Box>
            <Box>
              <Icon _hover={{ cursor: "pointer" }} as={SlOptions}></Icon>
            </Box>
          </Flex>
          <Box
            maxW={"480px"}
            maxH={"1000px"}
            minW={"150px"}
            h={"auto"}
            minH={"300px"}
          >
            <Image
              src={props.val.image}
              width={"100%"}
              h={"auto"}
              alt=""
              // style={{
              //   boxShadow:
              //     "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
              // }}
            />
          </Box>

          <Flex justifyContent={"space-between"} fontSize={"xl"}>
            <Flex
              width={"20%"}
              justifyContent={"space-evenly"}
              align={"center"}
            >
              <Icon
                _hover={{ cursor: "pointer" }}
                // as={AiFillHeart}
                // color={"red"}
                as={AiOutlineHeart}
              ></Icon>
              <Icon _hover={{ cursor: "pointer" }} as={BsChat}></Icon>
              <Icon _hover={{ cursor: "pointer" }} as={TbSend}></Icon>
            </Flex>
            <Box>
              <Icon
                _hover={{ cursor: "pointer" }}
                as={RxBookmark}
                // as={RxBookmarkFilled}
              ></Icon>
            </Box>
          </Flex>
          <Text>Count Like</Text>
          <Flex>{props.val.caption}</Flex>
          <Flex>comment</Flex>
        </Box>
      </Container>
    </>
  );
}
