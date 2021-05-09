import { Button } from "@chakra-ui/button";
import { Center, CircularProgress, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { VStack, HStack } from "@chakra-ui/layout";
import { useConsumableContext } from "./ConsumableContext";

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
  if (!consumable) {
    return (
      <Center flex="1">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }

  return (
    <VStack padding="4" alignItems="start" spacing="4">
      <HStack justifyContent="space-between" width="full">
        <Heading size="xl" width="full">
          {consumable.type}
        </Heading>

        <Link
          to={`/consumable/${consumable.type.toLowerCase()}/${
            consumable.id
          }/edit`}
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

function useLoadConsumable() {
  const { id } = useParams();
  const [consumable, setConsumable] = useState();
  const { consumableService } = useConsumableContext();

  useEffect(() => {
    (async () => {
      setConsumable(await consumableService.getConsumable(id));
    })();
  }, [consumableService, id]);

  return consumable;
}

function ConsumableDetailContainer() {
  const consumable = useLoadConsumable();
  return <ConsumableDetail consumable={consumable} />;
}

export default ConsumableDetailContainer;
