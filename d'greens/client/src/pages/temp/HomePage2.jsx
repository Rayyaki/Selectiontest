import { Flex, Center } from "@chakra-ui/react";
import CardPost from "../components/CardPost";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import bgc from "../assets/logo/bglanding.jpg";

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
  return (
    <>
      <Center w={"100vw"} bgColor={"black"}>
        <Flex
          flexDir={"column"}
          gap={"16px"}
          // bgColor={"#31332e"}
          bgColor={"#0c1414"}
          minW={"330px"}
          maxW={"100vw"}
        >
          <TopBar></TopBar>
          {/* <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          > */}
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          <CardPost />
          {/* </Masonry> */}
        </Flex>
        <Navbar></Navbar>
      </Center>
    </>
  );
}
