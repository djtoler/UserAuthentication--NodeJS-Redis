import { useHistory } from "react-router";
import React, { useState } from "react";
import {
  Container,
  Box,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Login from "../Components/Login";
import Register from "../Components/Register";

const SuccessfulLogin = () => {
  const history = useHistory();

  function SuccessfulLoginPageClickHandler() {
    alert("Finished");
  }

  return (
    <Container maxWidth="xl" centerContent>
      <button onClick={SuccessfulLoginPageClickHandler}>Login Was Successful!</button>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans" color="black">
          Login Was Successful
        </Text>
      </Box>
      <Box
        bg="white"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        color="black"
      >
      </Box>
    </Container>
  );
};

export default SuccessfulLogin;
