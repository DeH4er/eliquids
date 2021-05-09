import { Button } from "@chakra-ui/button";
import { HStack, VStack } from "@chakra-ui/layout";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Tag,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { calculate } from "calculations";
import Loading from "components/Loading";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RecipeSummary from "./components/RecipeSummary";
import { useRecipeContext } from "./RecipeContext";

function NicotineDetail({ nicotine }) {
  return (
    <Wrap>
      <Text>
        <Text>{nicotine.strength}mg</Text>
      </Text>
      <Tag>
        {nicotine.vg}/{nicotine.pg}
      </Tag>
    </Wrap>
  );
}

function FlavorDetails({ flavors }) {
  return (
    <VStack width="full" spacing="1.5" alignItems="start">
      {flavors.map((f) => (
        <Wrap>
          <Text>{f.flavor.name}</Text>
          <Tag>{f.flavor.flavorType}</Tag>
        </Wrap>
      ))}
    </VStack>
  );
}

function RecipeDetail({ recipe, summary }) {
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
        <Tag colorScheme="teal">{recipe.amount}ml</Tag>
        <Tag colorScheme="teal">{recipe.nicotineStrength}mg</Tag>
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

      <Accordion defaultIndex={[0]} allowMultiple width="full">
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Heading size="xs">Nicotine</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <NicotineDetail nicotine={recipe.nicotine} />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Heading size="xs">Flavors</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <FlavorDetails flavors={recipe.flavors} />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Heading size="xs">Summary</Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={0}>
            <RecipeSummary summary={summary} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </VStack>
  );
}

function useLoadRecipe() {
  const [recipe, setRecipe] = useState();
  const [summary, setSummary] = useState();
  const { recipeService } = useRecipeContext();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const recipe = await recipeService.getRecipe(id);
      setSummary(calculate(recipe));
      setRecipe(recipe);
    })();
  }, [id, recipeService]);

  return { recipe, summary };
}

function RecipeDetailContainer() {
  const { recipe, summary } = useLoadRecipe();

  return <RecipeDetail recipe={recipe} summary={summary} />;
}

export default RecipeDetailContainer;
