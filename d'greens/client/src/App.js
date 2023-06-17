import logo from "./logo.svg";
import "./App.css";
import RegisterPage from "./pages/RegisterPage";
import { ClassNames } from "@emotion/react";
import LoginPage from "./pages/LoginPage";
import { useEffect, useState } from "react";
import { Center, Image } from "@chakra-ui/react";
import { Routes } from "react-router-dom";
import routes from "./routes/routes";
import loader from "./assets/logo/loadingdg3.gif";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  });

  return (
    <>
      {loading ? (
        <Center
          h={"100vh"}
          // maxW={"500px"}
          w={"100%"}
          bgColor={"black"}
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
        >
          <Image src={loader} />
        </Center>
      ) : (
        <Routes>{routes.map((val) => val)}</Routes>
      )}
    </>
  );
}

export default App;
