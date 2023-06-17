import { Flex, Center } from "@chakra-ui/react";
import CardPost from "../components/CardPost";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import bgc from "../assets/logo/bglanding.jpg";
import { useSelector } from "react-redux";
import InfoVerify from "../components/InfoVerify";
import { useEffect, useState } from "react";
import { api } from "../api/api";

// code untuk buat tampilan resposive :
// import React from "react";
// import Masonry from "react-masonry-css";

// const breakpointColumnsObj = {
//   default: 1,
//   900: 3,
//   700: 2,
//   400: 1,
// };

export default function HomePage() {
  const [posting, setPosting] = useState([]);
  const userSelector = useSelector((state) => state.auth);
  console.log(userSelector.verify);

  async function showPost() {
    await api.get("/post/getall").then((res) => {
      setPosting(res.data);
      console.log(res.data);
    });
  }

  useEffect(() => {
    showPost();
  }, []);

  return (
    <>
      <TopBar />
      {userSelector.verify == "0" ? <InfoVerify /> : null}

      <Center w={"100vw"} bgColor={"black"} bgImage={bgc}>
        <Flex
          flexDir={"column"}
          gap={"16px"}
          // bgColor={"#31332e"}
          bgColor={"black"}
          minW={"330px"}
          maxW={"100vw"}
        >
          {/* <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          > */}
          {posting.length
            ? posting.map((val) => {
                console.log(val);
                return <CardPost val={val} />;
              })
            : null}
          {/* </Masonry> */}
        </Flex>
        <Navbar></Navbar>
      </Center>
    </>
  );
}
