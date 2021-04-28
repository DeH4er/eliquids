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
import { useRecipeContext } from "RecipeContext";

function RecipeListContainer() {
  const history = useHistory();
  const { recipeService } = useRecipeContext();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      const loadedRecipes = await recipeService.getRecipes();
      setRecipes(loadedRecipes);
    })();
  }, [recipeService]);

  function onRecipeClick(recipe) {
    history.push(`/recipe/${recipe.id}`, { recipe });
  }

  return (
    <VStack spacing="4" flex="1" overflow="auto">
      <HStack width="full" padding="4" paddingBottom="0">
        <Heading size="xl" width="full">
          My recipes
        </Heading>
        <Link to="/recipe/create">
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
                <Tag key={flavor.flavor.id}>
                  {flavor.flavor.name} ({flavor.percent}%)
                </Tag>
              ))}
            </Wrap>
          </VStack>
        ))}
      </VStack>
    </VStack>
  );
}

export default RecipeListContainer;
