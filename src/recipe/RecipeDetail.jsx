import { Button } from "@chakra-ui/button";
import { HStack, VStack } from "@chakra-ui/layout";
import { Heading, Tag, Wrap } from "@chakra-ui/react";
import Loading from "components/Loading";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecipeContext } from "./RecipeContext";

function RecipeDetail({ recipe }) {
  if (!recipe) {
    return <Loading />;
  }

  return (
    <VStack padding="4" alignItems="start" spacing="4">
      <HStack justifyContent="space-between" width="full">
        <Heading size="xl" width="full">
          {recipe.name}
        </Heading>

        <Link to="/recipe">
          <Button>List</Button>
        </Link>
      </HStack>

      <Wrap width="full">
        <Tag colorScheme="teal">VG {recipe.vg}</Tag>
        <Tag colorScheme="teal">PG {recipe.pg}</Tag>
      </Wrap>

      <Wrap width="full">
        {recipe.flavors.map((flavor) => (
          <Tag key={flavor.flavor.id}>
            {flavor.flavor.name} ({flavor.percent}%)
          </Tag>
        ))}
      </Wrap>
    </VStack>
  );
}

function useLoadRecipe() {
  const [recipe, setRecipe] = useState();
  const { recipeService } = useRecipeContext();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      setRecipe(await recipeService.getRecipe(id));
    })();
  });

  return recipe;
}

function RecipeDetailContainer() {
  const recipe = useLoadRecipe();

  return <RecipeDetail recipe={recipe} />;
}

export default RecipeDetailContainer;
