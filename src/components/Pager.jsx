import React from "react";
import { Box, Flex } from "@chakra-ui/react";

function Pager({ children, page, style }) {
  return (
    <Flex style={style}>
      <Flex
        style={{
          width: "100vw",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {children.map((c, pageIndex) => (
          <Box
            key={pageIndex}
            style={{
              left: `${(pageIndex - page) * 100}vw`,
              transition: "all .3s ease",
              height: "100%",
              position: "absolute",
              overflowY: "auto",
              overflowX: "hidden",
              top: 0,
              width: "100vw",
              flexShrink: 0,
            }}
          >
            {c}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
}

export default Pager;
