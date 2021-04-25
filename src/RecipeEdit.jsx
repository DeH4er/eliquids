import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import {
  FormProvider,
  useController,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";

const EditRecipeContext = React.createContext(null);

const FLAVOR_TYPES = ["PG", "VG"];

function ControlledNumberInput(props) {
  const {
    field: { ref, onBlur, onChange, value },
  } = useController({
    name: props.name,
    control: props.control,
  });

  return (
    <NumberInput
      {...props}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
      ref={ref}
    >
      {props.children}
    </NumberInput>
  );
}

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
        color="green.400"
        size="6.5rem"
      >
        <CircularProgressLabel>{page + 1} of 2</CircularProgressLabel>
      </CircularProgress>
    </Flex>
  );
}

function Pager({ children, page, style }) {
  return (
    <Flex style={style}>
      <Flex
        style={{
          width: "100vw",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {children.map((c, pageIndex) => (
          <Box
            key={pageIndex}
            style={{
              left: `${(pageIndex - page) * 100}vw`,
              transition: "all .3s ease",
              height: "100%",
              position: "absolute",
              overflowY: "auto",
              overflowX: "hidden",
              top: 0,
              width: "100vw",
              flexShrink: 0,
            }}
          >
            {c}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
}

function OverallPage() {
  const { control, register, formState, setValue } = useFormContext();

  return (
    <VStack flex={1} width="full" paddingX="4" spacing="4">
      <FormControl isInvalid={formState.errors.name}>
        <FormLabel>Liquid name</FormLabel>
        <Input
          placeholder="Liquid name..."
          {...register("name", { required: true })}
        />
      </FormControl>

      <FormControl isInvalid={formState.errors.desiredPG}>
        <FormLabel>Desired PG</FormLabel>
        <ControlledNumberInput
          control={control}
          name="desiredPG"
          min={0}
          max={100}
        >
          <NumberInputField placeholder="Desired PG..." />
        </ControlledNumberInput>
      </FormControl>

      <FormControl isInvalid={formState.errors.desiredVG}>
        <FormLabel>Desired VG</FormLabel>
        <ControlledNumberInput
          control={control}
          name="desiredVG"
          min={0}
          max={100}
        >
          <NumberInputField placeholder="Desired VG..." />
        </ControlledNumberInput>
      </FormControl>
    </VStack>
  );
}

function FlavorPage() {
  const { control, register, formState, setValue } = useFormContext();
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
            <FormControl isInvalid={formState.errors.flavors?.[index]?.name}>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Flavor name..."
                {...register(`flavors.${index}.name`, { required: true })}
                defaultValue={field.name}
              />
            </FormControl>

            <FormControl isInvalid={formState.errors.flavors?.[index]?.percent}>
              <FormLabel>Flavor percent</FormLabel>
              <ControlledNumberInput
                control={control}
                name={`flavors.${index}.percent`}
                min={0}
                max={100}
                defaultValue={field.percent}
              >
                <NumberInputField placeholder="Flavor percent..." />
              </ControlledNumberInput>
            </FormControl>

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
        <Button flex="1" type="submit">
          Finish
        </Button>
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

  function submit(recipe) {
    history.push("/recipe/list");
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
