import {
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  HStack,
  LightMode,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import Pager from "components/Pager";
import InputControl from "form/InputControl";
import NumberInputControl from "form/NumberInputControl";
import React, { useContext, useState } from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { useRecipeContext } from "RecipeContext";

const EditRecipeContext = React.createContext(null);

const FLAVOR_TYPES = ["PG", "VG"];

function Header() {
  const { page } = useContext(EditRecipeContext);

  function getHeader() {
    if (page === 0) {
      return "Overall";
    }

    if (page === 1) {
      return "Flavor";
    }

    return "";
  }

  function getDescription() {
    if (page === 0) {
      return "Desired properties of liquid";
    }

    if (page === 1) {
      return "Mix your flavors";
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
        value={((page + 1) / 2) * 100}
        color="teal.500"
        size="6.5rem"
      >
        <CircularProgressLabel>{page + 1} of 2</CircularProgressLabel>
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

function FlavorPage() {
  const { control, register, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "flavors",
  });

  function addFlavor() {
    append({ name: "", percent: 5, type: "PG" });
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
          <VStack width="full" key={field.id}>
            <InputControl
              control={control}
              rules={{ required: true }}
              label="Flavor name"
              name={`flavors.${index}.name`}
              defaultValue={field.name}
              placeholder="Flavor name..."
            />

            <NumberInputControl
              control={control}
              rules={{ required: true }}
              label="Flavor percent"
              name={`flavors.${index}.percent`}
              defaultValue={field.percent}
              placeholder="Flavor percent..."
              min={0}
              max={100}
            />

            <HStack justifyContent="space-between" width="full">
              <RadioGroup
                {...register(`flavors.${index}.type`)}
                defaultValue={field.type}
                onChange={(v) => setValue(`flavors.${index}.type`, v)}
              >
                <HStack>
                  {FLAVOR_TYPES.map((flavorType) => (
                    <Radio value={flavorType} key={flavorType}>
                      {flavorType}
                    </Radio>
                  ))}
                </HStack>
              </RadioGroup>
              <Button onClick={() => removeFlavor(index)}>Delete</Button>
            </HStack>
          </VStack>
        ))}
      </VStack>
    </VStack>
  );
}

function Pages() {
  const { page } = useContext(EditRecipeContext);

  return (
    <Pager page={page} style={{ flex: 1 }}>
      <OverallPage />
      <FlavorPage />
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

      {page < 1 && (
        <Button flex="1" onClick={nextPage}>
          Next
        </Button>
      )}

      {page === 1 && (
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
  const { recipe = null } = state;
  const { service } = useRecipeContext();

  const methods = useForm({
    defaultValues: {
      name: recipe?.name ?? "",
      desiredPG: recipe?.desiredPG ?? 30,
      desiredVG: recipe?.desiredVG ?? 70,
      flavors: recipe?.flavors ?? [],
    },
  });
  const isNew = recipe === null;
  const history = useHistory();

  function nextPage() {
    if (page > 1) {
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

  async function submit(newRecipe) {
    const saveFn = isNew ? service.createRecipe : service.updateRecipe;
    const savedRecipe = await saveFn({ ...newRecipe, id: recipe?.id });
    history.push(`/recipe/${savedRecipe.id}`, { recipe: savedRecipe });
  }

  return (
    <EditRecipeContext.Provider value={{ page, nextPage, prevPage }}>
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
