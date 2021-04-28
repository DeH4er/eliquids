import { Button } from "@chakra-ui/button";
import { Heading, Tag, Wrap, Text, LightMode } from "@chakra-ui/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { VStack, HStack } from "@chakra-ui/layout";

function RecipeDetail({ recipe }) {
  return (
    <VStack padding="4" alignItems="start" spacing="4">
      <HStack justifyContent="space-between" width="full">
        <Heading size="xl" width="full">
          {recipe.name}
        </Heading>

        <Link
          to={{
            pathname: `/recipe/${recipe.id}/edit`,
            state: { recipe },
          }}
        >
          <Button>Edit</Button>
        </Link>

        <Link to="/recipe">
          <Button>List</Button>
        </Link>
      </HStack>

      <Wrap width="full">
        <Tag colorScheme="teal">VG {recipe.desiredVG}</Tag>
        <Tag colorScheme="teal">PG {recipe.desiredPG}</Tag>
      </Wrap>

      <Wrap width="full">
        {recipe.flavors.map((flavor) => (
          <Tag key={flavor.flavor.id}>
            {flavor.flavor.name} ({flavor.percent}%)
          </Tag>
        ))}
      </Wrap>

      <Link
        style={{ width: "100%" }}
        to={{
          pathname: "/mixture/create",
          state: { mixture: { recipe } },
        }}
      >
        <LightMode>
          <Button width="full" colorScheme="teal">
            Make a mixture
          </Button>
        </LightMode>
      </Link>
    </VStack>
  );
}

function RecipeDetailContainer() {
  const {
    state: { recipe },
  } = useLocation();

  return <RecipeDetail recipe={recipe} />;
}

export default RecipeDetailContainer;
