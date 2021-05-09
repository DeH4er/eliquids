import { Button } from "@chakra-ui/button";
import { VStack } from "@chakra-ui/layout";
import { LightMode, Text } from "@chakra-ui/react";
import HeaderBar from "components/HeaderBar";
import Loading from "components/Loading";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
    return <Loading />;
  }

  return (
    <>
      <HeaderBar
        heading={consumable.type}
        leftNavigation={{ to: "/consumable", label: "List" }}
        rightAccessory={
          <Link
            to={`/consumable/${consumable.type.toLowerCase()}/${
              consumable.id
            }/edit`}
          >
            <LightMode>
              <Button colorScheme="teal">Edit</Button>
            </LightMode>
          </Link>
        }
      />
      <VStack padding="4" alignItems="start" spacing="4" paddingTop="0">
        <Text>
          {[getHeader(consumable), getDescription(consumable)]
            .filter(Boolean)
            .join(", ")}
        </Text>
      </VStack>
    </>
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
