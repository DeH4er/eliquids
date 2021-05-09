// @ts-nocheck
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
import { calculate } from "calculations";
import DatepickerControl from "components/form/DatepickerControl";
import Pager from "components/Pager";
import React, { useContext, useEffect, useState } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { useHistory } from "react-router-dom";
import { today } from "utils/date";
import InputControl from "../components/form/InputControl";
import NumberInputControl from "../components/form/NumberInputControl";
import SelectControl from "../components/form/SelectControl";
import RecipeSummary from "./components/RecipeSummary";
import { useRecipeContext } from "./RecipeContext";

const RecipeCreateContext = React.createContext(null);

function Header() {
  const { page } = useContext(RecipeCreateContext);

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
        label="Total amount"
        name="amount"
        placeholder="Total amount..."
        min={0}
        max={100}
      />

      <NumberInputControl
        control={control}
        rules={{ required: true }}
        label="Desired PG"
        name="pg"
        placeholder="Desired PG..."
        min={0}
        max={100}
      />

      <NumberInputControl
        control={control}
        rules={{ required: true }}
        label="Desired VG"
        name="vg"
        placeholder="Desired VG..."
        min={0}
        max={100}
      />

      <DatepickerControl
        control={control}
        rules={{ required: true }}
        label="Steep until"
        type="date"
        name="steepUntil"
        placeholder="Steep until..."
        min={today()}
      />
    </VStack>
  );
}

function NicotinePage() {
  const { control } = useFormContext();
  const { nicotineList } = useContext(RecipeCreateContext);

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
        values={nicotineList}
        compare={(f1, f2) => f1?.id === f2?.id}
      >
        {(nicotine) =>
          `${nicotine.strength}mg, ${nicotine.vg}VG/${nicotine.pg}PG`
        }
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

  const { flavors } = useContext(RecipeCreateContext);

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
  const { summary } = useContext(RecipeCreateContext);

  return (
    <VStack
      flex={1}
      width="full"
      paddingX="4"
      spacing="4"
      alignItems="flex-end"
    >
      <RecipeSummary summary={summary} />
    </VStack>
  );
}

function Pages() {
  const { page } = useContext(RecipeCreateContext);

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
  const { page, prevPage, nextPage, submit } = useContext(RecipeCreateContext);

  return (
    <HStack paddingX="4" paddingBottom="4" width="full">
      <Button flex="1" onClick={prevPage} disabled={page === 0}>
        Back
      </Button>

      {page < 2 && (
        <Button flex="1" onClick={nextPage}>
          Next
        </Button>
      )}

      {page === 2 && (
        <Button flex="1" type="submit">
          Next
        </Button>
      )}

      {page === 3 && (
        <LightMode>
          <Button flex="1" colorScheme="teal" onClick={submit}>
            Finish
          </Button>
        </LightMode>
      )}
    </HStack>
  );
}

function RecipeCreate() {
  return (
    <VStack flex={1} overflow="auto" spacing="4">
      <Header />
      <Pages />
      <PageControls />
    </VStack>
  );
}

function useNicotineList() {
  return useConsumableType("nicotine");
}

function useFlavorList() {
  return useConsumableType("flavor");
}

function useConsumableType(type) {
  const [flavors, setFlavors] = useState([]);
  const { consumablesService } = useRecipeContext();

  useEffect(() => {
    (async () => {
      const flavors = await consumablesService.getConsumablesByType(type);
      setFlavors(flavors);
    })();
  }, [consumablesService, type]);

  return flavors;
}

function RecipeCreateContainer() {
  const [page, setPage] = useState(0);
  const [summary, setSummary] = useState([]);
  const [recipe, setRecipe] = useState();
  const { recipeService } = useRecipeContext();
  const flavors = useFlavorList();
  const nicotineList = useNicotineList();
  const history = useHistory();
  const methods = useForm({
    defaultValues: {
      name: "",
      amount: 100,
      pg: 30,
      vg: 70,
      steepUntil: new Date(),
      nicotine: null,
      nicotineStrength: 2,
      flavors: [],
    },
  });

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

  function calculateSummary(recipe) {
    setSummary(calculate(recipe));
    setRecipe(recipe);
    nextPage();
  }

  async function submit() {
    const savedRecipe = await recipeService.createRecipe(recipe);
    history.push(`/recipe/${savedRecipe.id}`, { recipe: savedRecipe });
  }

  return (
    <RecipeCreateContext.Provider
      value={{
        page,
        nextPage,
        prevPage,
        flavors,
        nicotineList,
        summary,
        submit,
      }}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(calculateSummary)}
          style={{ display: "flex", flex: "1" }}
        >
          <RecipeCreate />
        </form>
      </FormProvider>
    </RecipeCreateContext.Provider>
  );
}

export default RecipeCreateContainer;
