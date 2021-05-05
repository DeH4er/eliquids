import {
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  HStack,
  LightMode,
  Text,
  VStack,
} from "@chakra-ui/react";
import Pager from "components/Pager";
import InputControl from "../components/form/InputControl";
import NumberInputControl from "../components/form/NumberInputControl";
import SelectControl from "../components/form/SelectControl";
import React, { useContext, useEffect, useState } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { useRecipeContext } from "./RecipeContext";

const EditRecipeContext = React.createContext(null);

function Header() {
  const { page } = useContext(EditRecipeContext);

  function getHeader() {
    if (page === 0) {
      return "Overall";
    }

    if (page === 1) {
      return "Nicotine";
    }

    if (page === 2) {
      return "Flavor";
    }

    if (page === 3) {
      return "Summary";
    }

    return "";
  }

  function getDescription() {
    if (page === 0) {
      return "Desired properties of liquid";
    }

    if (page === 1) {
      return "Properties of nicotine";
    }

    if (page === 2) {
      return "Mix your flavors";
    }

    if (page === 3) {
      return "Check everything and make a liquid";
    }

    return "";
  }

  return (
    <Flex width="full" paddingX="4" paddingTop="4">
      <Flex
        flexDirection="column"
        alignItems="start"
        justifyContent="center"
        flex={1}
      >
        <Heading>{getHeader()}</Heading>
        <Text opacity=".6">{getDescription()}</Text>
      </Flex>
      <CircularProgress
        value={((page + 1) / 4) * 100}
        color="teal.500"
        size="6.5rem"
      >
        <CircularProgressLabel>{page + 1} of 4</CircularProgressLabel>
      </CircularProgress>
    </Flex>
  );
}

function OverallPage() {
  const { control } = useFormContext();

  return (
    <VStack flex={1} width="full" paddingX="4" spacing="4">
      <InputControl
        control={control}
        rules={{ required: true }}
        label="Liquid name"
        name="name"
        placeholder="Liquid name..."
      />

      <NumberInputControl
        control={control}
        rules={{ required: true }}
        label="Desired PG"
        name="desiredPG"
        placeholder="Desired PG..."
        min={0}
        max={100}
      />

      <NumberInputControl
        control={control}
        rules={{ required: true }}
        label="Desired VG"
        name="desiredVG"
        placeholder="Desired VG..."
        min={0}
        max={100}
      />
    </VStack>
  );
}

function NicotinePage() {
  const { control } = useFormContext();

  return (
    <VStack flex={1} width="full" paddingX="4" spacing="4">
      <NumberInputControl
        control={control}
        rules={{ required: true }}
        label="Desired strength"
        name="nicotineStrength"
        placeholder="Desired strength..."
        min={0}
      />

      <SelectControl
        control={control}
        name="nicotine"
        label="Nicotine"
        values={[]}
        compare={(f1, f2) => f1.id === f2.id}
      >
        {(nicotine) => `${nicotine.strength}, ${nicotine.vg}/${nicotine.pg}`}
      </SelectControl>
    </VStack>
  );
}

function FlavorPage() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "flavors",
  });

  const { flavors } = useContext(EditRecipeContext);

  function addFlavor() {
    append({ flavor: flavors[0], percent: 10 });
  }

  function removeFlavor(index) {
    remove(index);
  }

  return (
    <VStack
      flex={1}
      width="full"
      paddingX="4"
      spacing="4"
      alignItems="flex-end"
    >
      <Button onClick={addFlavor}>Add</Button>

      <VStack spacing="8" width="full">
        {fields.map((field, index) => (
          <VStack width="full" key={field.id} alignItems="start">
            <SelectControl
              control={control}
              name={`flavors.${index}.flavor`}
              label="Flavor"
              values={flavors}
              compare={(f1, f2) => f1.id === f2.id}
              defaultValue={field.flavor}
            >
              {(flavor) => flavor.name}
            </SelectControl>

            <NumberInputControl
              control={control}
              label="Percent (%)"
              placeholder="Percent..."
              name={`flavors.${index}.percent`}
              min={0}
              max={100}
              defaultValue={field.percent}
            ></NumberInputControl>
            <Button onClick={() => removeFlavor(index)}>Delete</Button>
          </VStack>
        ))}
      </VStack>
    </VStack>
  );
}

function SummaryPage() {
  return (
    <VStack
      flex={1}
      width="full"
      paddingX="4"
      spacing="4"
      alignItems="flex-end"
    >
      <Text>yeah</Text>
    </VStack>
  );
}

function Pages() {
  const { page } = useContext(EditRecipeContext);

  return (
    <Pager page={page} style={{ flex: 1 }}>
      <OverallPage />
      <NicotinePage />
      <FlavorPage />
      <SummaryPage />
    </Pager>
  );
}

function PageControls() {
  const { page, prevPage, nextPage } = useContext(EditRecipeContext);

  return (
    <HStack paddingX="4" paddingBottom="4" width="full">
      <Button flex="1" onClick={prevPage} disabled={page === 0}>
        Back
      </Button>

      {page < 3 && (
        <Button flex="1" onClick={nextPage}>
          Next
        </Button>
      )}

      {page === 3 && (
        <LightMode>
          <Button flex="1" type="submit" colorScheme="teal">
            Finish
          </Button>
        </LightMode>
      )}
    </HStack>
  );
}

function RecipeEdit() {
  return (
    <VStack flex={1} overflow="auto" spacing="4">
      <Header />
      <Pages />
      <PageControls />
    </VStack>
  );
}

function RecipeEditContainer() {
  const [page, setPage] = useState(0);
  const { state = {} } = useLocation();
  const { recipe = {} } = state;
  const { recipeService, consumablesService } = useRecipeContext();
  const [flavors, setFlavors] = useState([]);

  const methods = useForm({
    defaultValues: {
      name: recipe.name ?? "",
      desiredPG: recipe.desiredPG ?? 30,
      desiredVG: recipe.desiredVG ?? 70,
      nicotineStrength: recipe.nicotineStrength ?? 2,
      nicotinePG: recipe.nicotinePG ?? 50,
      nicotineVG: recipe.nicotineVG ?? 50,
      flavors: recipe.flavors ?? [],
    },
  });
  const isNew = !recipe.id;
  const history = useHistory();

  function nextPage() {
    if (page > 2) {
      return;
    }

    setPage(page + 1);
  }

  function prevPage() {
    if (page <= 0) {
      return;
    }

    setPage(page - 1);
  }

  useEffect(() => {
    (async () => {
      const flavors = await consumablesService.getConsumablesByType("flavor");
      setFlavors(flavors);
    })();
  }, [consumablesService]);

  async function submit(newRecipe) {
    const saveFn = isNew
      ? recipeService.createRecipe
      : recipeService.updateRecipe;
    const savedRecipe = await saveFn({ ...newRecipe, id: recipe.id });
    history.push(`/recipe/${savedRecipe.id}`, { recipe: savedRecipe });
  }

  return (
    <EditRecipeContext.Provider value={{ page, nextPage, prevPage, flavors }}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(submit)}
          style={{ display: "flex", flex: "1" }}
        >
          <RecipeEdit />
        </form>
      </FormProvider>
    </EditRecipeContext.Provider>
  );
}

export default RecipeEditContainer;
