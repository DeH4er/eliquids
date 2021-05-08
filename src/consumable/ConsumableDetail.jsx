import { Button } from "@chakra-ui/button";
import { Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { VStack, HStack } from "@chakra-ui/layout";

function getHeader(consumable) {
  switch (consumable.type) {
    case "flavor":
      return consumable.name;
    case "pg":
    case "vg":
      return `${consumable.amount}ml`;
    case "nicotine":
      return `${consumable.strength}mg`;
    default:
      return "Unknown type";
  }
}

function getDescription(consumable) {
  switch (consumable.type) {
    case "flavor":
      return `${consumable.amount}ml, ${consumable.flavorType}`;
    case "pg":
    case "vg":
      return "";
    case "nicotine":
      return `${consumable.amount}ml, ${consumable.vg}/${consumable.pg}`;
    default:
      return "Unknown type";
  }
}

function ConsumableDetail({ consumable }) {
  return (
    <VStack padding="4" alignItems="start" spacing="4">
      <HStack justifyContent="space-between" width="full">
        <Heading size="xl" width="full">
          {consumable.type}
        </Heading>

        <Link
          to={{
            pathname: `/consumable/${consumable.id}/edit`,
            state: { consumable },
          }}
        >
          <Button>Edit</Button>
        </Link>

        <Link to="/consumable">
          <Button>List</Button>
        </Link>
      </HStack>

      <Text>
        {[getHeader(consumable), getDescription(consumable)]
          .filter(Boolean)
          .join(", ")}
      </Text>
    </VStack>
  );
}

function ConsumableDetailContainer() {
  const {
    state: { consumable },
  } = useLocation();

  return <ConsumableDetail consumable={consumable} />;
}

export default ConsumableDetailContainer;
