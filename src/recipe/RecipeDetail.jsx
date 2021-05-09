import { VStack } from "@chakra-ui/layout";
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
import HeaderBar from "components/HeaderBar";
import Loading from "components/Loading";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    <>
      <HeaderBar
        leftNavigation={{ to: "/recipe", label: "List" }}
        heading={recipe.name}
      />
      <VStack padding="4" alignItems="start" spacing="4">
        <Wrap width="full">
          <Tag colorScheme="teal">{recipe.amount}ml</Tag>
          <Tag colorScheme="teal">{recipe.nicotineStrength}mg</Tag>
          <Tag colorScheme="teal">
            {recipe.vg}/{recipe.pg}
          </Tag>
        </Wrap>

        <Wrap width="full">
          {recipe.flavors.map((flavor) => (
            <Tag key={flavor.flavor.id}>
              {flavor.flavor.name} ({flavor.percent}%)
            </Tag>
          ))}
        </Wrap>

        <Accordion defaultIndex={[0]} allowMultiple width="full">
          <AccordionItem border="0">
            <h2>
              <AccordionButton paddingX="0">
                <Box flex="1" textAlign="left">
                  <Heading size="md">Summary</Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <RecipeSummary summary={summary} />
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border="0">
            <h2>
              <AccordionButton paddingX="0">
                <Box flex="1" textAlign="left">
                  <Heading size="md">Nicotine</Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <NicotineDetail nicotine={recipe.nicotine} />
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border="0">
            <h2>
              <AccordionButton paddingX="0">
                <Box flex="1" textAlign="left">
                  <Heading size="md">Flavors</Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <FlavorDetails flavors={recipe.flavors} />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </VStack>
    </>
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
