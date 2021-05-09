import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Heading,
  HStack,
  LightMode,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import HeaderBar from "components/HeaderBar";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useConsumableContext } from "./ConsumableContext";

function AddConsumable() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <LightMode>
        <Button colorScheme="teal" onClick={() => setModalOpen(true)}>
          <AddIcon />
        </Button>
      </LightMode>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} isCentered>
        <ModalOverlay></ModalOverlay>
        <ModalContent margin="4" marginY="auto">
          <ModalHeader>Select consumable type</ModalHeader>
          <ModalBody paddingX="4" paddingBottom="4">
            <SimpleGrid columns={2} spacing={4}>
              {[
                { type: "flavor", label: "Flavor" },
                { type: "nicotine", label: "Nicotine" },
                { type: "pg", label: "PG" },
                { type: "vg", label: "VG" },
              ].map(({ label, type }) => (
                <Link to={`/consumable/${type}/create`} key={type}>
                  <Center
                    height="80px"
                    borderColor="gray.600"
                    borderWidth="1px"
                    borderRadius="4"
                  >
                    <Text fontWeight="bold">{label}</Text>
                  </Center>
                </Link>
              ))}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

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
    history.push(`/consumable/${consumable.id}`);
  }

  return (
    <>
      <HeaderBar
        heading="Consumables"
        leftNavigation={{ to: "/home", label: "Home" }}
        rightAccessory={<AddConsumable />}
      />
      <VStack spacing="4" flex="1" overflow="auto">
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
    </>
  );
}

export default ConsumableListContainer;
