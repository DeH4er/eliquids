import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";

function HeaderBar({
  heading,
  rightAccessory = undefined,
  leftNavigation = undefined,
}) {
  const history = useHistory();

  function onLeftNavigationClick() {
    history.push(leftNavigation.to);
  }

  return (
    <HStack width="full" height="16" spacing="0">
      {leftNavigation && (
        <Box
          size="md"
          fontWeight="normal"
          display="flex"
          alignItems="center"
          cursor="pointer"
          onClick={onLeftNavigationClick}
          position="absolute"
          zIndex="2"
          color="teal"
        >
          <ChevronLeftIcon width="10" height="10" />
          <Text marginLeft="-1.5">{leftNavigation.label}</Text>
        </Box>
      )}

      <Heading
        margin="0"
        size="md"
        width="full"
        textAlign="center"
        position="absolute"
      >
        {heading}
      </Heading>

      <Box position="absolute" right="4">
        {rightAccessory}
      </Box>
    </HStack>
  );
}

export default HeaderBar;
