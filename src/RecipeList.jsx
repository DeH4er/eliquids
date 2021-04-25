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
} from "@chakra-ui/react";
import React from "react";
import { Link, useHistory } from "react-router-dom";

const recipes = [
  {
    id: 0,
    name: "Sweet melon",
    desiredPG: 30,
    desiredVG: 70,
    flavors: [
      { _key: 0, name: "Melon", percent: 15 },
      { _key: 1, name: "Donut", percent: 3 },
    ],
  },
  {
    id: 1,
    name: "Lemon cake",
    desiredPG: 30,
    desiredVG: 70,
    flavors: [
      { _key: 0, name: "Lemon Cake", percent: 6 },
      { _key: 1, name: "Melon", percent: 4 },
      { _key: 1, name: "Donut", percent: 5 },
    ],
  },
  {
    id: 2,
    name: "Pure donut",
    desiredPG: 30,
    desiredVG: 70,
    flavors: [{ _key: 0, name: "Donut", percent: 15 }],
  },
];

function RecipeListContainer() {
  const history = useHistory();

  function onRecipeClick(recipe) {
    history.push(`/recipe/${recipe.id}/edit`, { recipe });
  }

  return (
    <Box flex="1" padding="4">
      <VStack spacing="4">
        <HStack width="full">
          <Heading size="xl" width="full">
            My recipes
          </Heading>
          <Link to="/recipe/create">
            <Button>
              <AddIcon />
            </Button>
          </Link>
        </HStack>
        {recipes.map((recipe) => (
          <VStack
            key={recipe.id}
            width="full"
            padding="4"
            borderColor="gray.600"
            borderWidth="1px"
            borderRadius="4"
            spacing="4"
            onClick={() => onRecipeClick(recipe)}
          >
            <Flex justifyContent="space-between" width="full">
              <Heading size="md">{recipe.name}</Heading>
              <Text opacity=".8">
                {recipe.desiredVG}/{recipe.desiredPG}
              </Text>
            </Flex>

            <Wrap width="full">
              {recipe.flavors.map((flavor) => (
                <Tag key={flavor._key}>
                  {flavor.name} ({flavor.percent}%)
                </Tag>
              ))}
            </Wrap>
          </VStack>
        ))}
      </VStack>
    </Box>
  );
}

export default RecipeListContainer;
