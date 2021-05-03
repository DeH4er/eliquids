import { AddIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import {
  Flex,
  Heading,
  VStack,
  Text,
  Tag,
  Wrap,
  Button,
  HStack,
  LightMode,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useConsumableContext } from "./ConsumableContext";

function Consumable({ consumable }) {
  function getHeader() {
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

  function getDescription() {
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

  return (
    <VStack width="full" alignItems="start" justifyContent="center">
      <HStack justifyContent="space-between" width="full">
        <Heading size="md">{getHeader()}</Heading>
        <Tag>{consumable.type}</Tag>
      </HStack>

      {getDescription() && <Text>{getDescription()}</Text>}
    </VStack>
  );
}

function ConsumableListContainer() {
  const history = useHistory();
  const { consumableService } = useConsumableContext();
  const [consumables, setConsumables] = useState([]);

  useEffect(() => {
    (async () => {
      const loadedConsumables = await consumableService.getConsumables();
      setConsumables(loadedConsumables);
    })();
  }, [consumableService]);

  function onConsumableClick(consumable) {
    history.push(`/consumable/${consumable.id}`, { consumable });
  }

  return (
    <VStack spacing="4" flex="1" overflow="auto">
      <HStack width="full" padding="4" paddingBottom="0">
        <Heading size="xl" width="full">
          My consumables
        </Heading>
        <Link to="/consumable/create">
          <LightMode>
            <Button colorScheme="teal">
              <AddIcon />
            </Button>
          </LightMode>
        </Link>
      </HStack>

      <VStack
        flex="1"
        overflow="auto"
        width="full"
        paddingX="4"
        paddingBottom="4"
      >
        {consumables.map((consumable) => (
          <VStack
            key={consumable.id}
            width="full"
            padding="4"
            borderColor="gray.600"
            borderWidth="1px"
            borderRadius="4"
            spacing="4"
            onClick={() => onConsumableClick(consumable)}
          >
            <Consumable consumable={consumable} />
          </VStack>
        ))}
      </VStack>
    </VStack>
  );
}

export default ConsumableListContainer;
