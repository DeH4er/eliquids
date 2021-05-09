import { Center, CircularProgress } from "@chakra-ui/react";
import React from "react";

function Loading() {
  return (
    <Center flex="1">
      <CircularProgress isIndeterminate />
    </Center>
  );
}

export default Loading;
