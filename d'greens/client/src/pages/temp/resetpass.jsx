import { Box, Center, Input, Button, Icon, Flex } from "@chakra-ui/react";
import { VscLock } from "react-icons/vsc";

export default function ResetPass() {
  return (
    <>
      <Center
        w={"100vw"}
        h={"500px"}
        minW={"175px"}
        maxW={"400px"}
        // justifyContent={"space-between"}
        flexDir={"column"}
        alignItems={"center"}
        border={"1px solid #e8e8e8"}
        marginTop={"10px"}
      >
        <Center display={"flex"} flexDir={"column"} alignItems={"center"}>
          <Icon
            as={VscLock}
            w={"100px"}
            h={"100px"}
            fontWeight={"medium"}
            mt={"10px"}
          />
          <Box fontSize={"small"} fontWeight={"bold"} mt={"10px"}>
            Trouble with logging in?
          </Box>
          <Box fontSize={"small"} w={"300px"} textAlign={"center"} mt={"10px"}>
            Enter your email address, phone number or username, and we'll send
            you a link to get back into your account.
          </Box>
          <Input
            width={"300px"}
            fontSize={"small"}
            placeholder="Phone number, username, or email address"
            borderRadius={"none"}
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
              Login with Facebook
            </Box>
          </Center>
          <Box>Forgot password?</Box>
        </Center>
      </Center>
    </>
  );
}
