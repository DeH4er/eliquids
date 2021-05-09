import { Button, LightMode, VStack } from "@chakra-ui/react";
import InputControl from "components/form/InputControl";
import NumberInputControl from "components/form/NumberInputControl";
import RadioControl from "components/form/RadioControl";
import HeaderBar from "components/HeaderBar";
import React, { useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { useConsumableContext } from "./ConsumableContext";

function FlavorEdit() {
  const { control } = useFormContext();

  return (
    <VStack width="full" alignItems="start" spacing="4" flex="1">
      <InputControl
        control={control}
        name="name"
        label="Name"
        placeholder="Name..."
        rules={{ required: true }}
      />

      <NumberInputControl
        control={control}
        name="amount"
        label="Amount (ml)"
        placeholder="Amount..."
        min={0}
        rules={{ required: true }}
      />

      <RadioControl
        control={control}
        name="flavorType"
        label="Flavor type"
        placeholder="Flavor type..."
        values={[
          { value: "PG", label: "PG" },
          { value: "VG", label: "VG" },
        ]}
      />
    </VStack>
  );
}

function NicotineEdit() {
  const { control } = useFormContext();

  return (
    <VStack width="full" alignItems="start" spacing="4" flex="1">
      <NumberInputControl
        control={control}
        name="amount"
        label="Amount (ml)"
        placeholder="Amount..."
        min={0}
        rules={{ required: true }}
      />

      <NumberInputControl
        control={control}
        name="strength"
        label="Strength (mg)"
        placeholder="Strength..."
        min={0}
        rules={{ required: true }}
      />

      <NumberInputControl
        control={control}
        name="pg"
        label="VG (%)"
        placeholder="PG..."
        min={0}
        max={100}
        rules={{ required: true }}
      />

      <NumberInputControl
        control={control}
        name="vg"
        label="VG (%)"
        placeholder="VG..."
        min={0}
        max={100}
        rules={{ required: true }}
      />
    </VStack>
  );
}

function PGEdit() {
  const { control } = useFormContext();

  return (
    <VStack width="full" alignItems="start" spacing="4" flex="1">
      <NumberInputControl
        control={control}
        name="amount"
        label="Amount (ml)"
        placeholder="Amount..."
        min={0}
        rules={{ required: true }}
      />
    </VStack>
  );
}

function VGEdit() {
  const { control } = useFormContext();

  return (
    <VStack width="full" alignItems="start" spacing="4" flex="1">
      <NumberInputControl
        control={control}
        name="amount"
        label="Amount (ml)"
        placeholder="Amount..."
        min={0}
        rules={{ required: true }}
      />
    </VStack>
  );
}

function useIsNew() {
  const { id } = useParams();
  return !id;
}

function useLoadConsumable(defaultValues) {
  const methods = useForm({ defaultValues });

  const { reset } = methods;
  const { consumableService } = useConsumableContext();
  const { id } = useParams();
  const isNew = useIsNew();

  useEffect(() => {
    (async () => {
      if (!isNew) {
        reset(await consumableService.getConsumable(id));
      }
    })();
  }, [reset, id, consumableService, isNew]);
  return methods;
}

function getDefaultValues(type) {
  switch (type) {
    case "flavor":
      return {
        flavorType: "PG",
        name: "",
        amount: 10,
      };
    case "nicotine":
      return {
        vg: 50,
        pg: 50,
        amount: 10,
        strength: 20,
      };
    case "pg":
    case "vg":
      return {
        amount: 1000,
      };
    default:
      return {};
  }
}

function ConsumableEditContainer() {
  const { consumableService } = useConsumableContext();
  const { type } = useParams();
  const methods = useLoadConsumable(getDefaultValues(type));
  const history = useHistory();
  const isNew = useIsNew();

  async function submit(consumableData) {
    const saveFn = isNew
      ? consumableService.createConsumable
      : consumableService.editConsumable;

    const savedConsumable = await saveFn({
      ...consumableData,
      type,
    });
    history.push(`/consumable/${savedConsumable.id}`, {
      consumable: savedConsumable,
    });
  }

  return (
    <FormProvider {...methods}>
      <HeaderBar
        heading={`${isNew ? "Create" : "Edit"} ${type}`}
        leftNavigation={{ to: "/consumable", label: "List" }}
      />
      <form
        onSubmit={methods.handleSubmit(submit)}
        style={{ flex: 1, display: "flex" }}
      >
        <VStack
          padding="4"
          spacing="4"
          alignItems="start"
          flex="1"
          paddingTop="0"
        >
          {type === "flavor" && <FlavorEdit />}
          {type === "nicotine" && <NicotineEdit />}
          {type === "pg" && <PGEdit />}
          {type === "vg" && <VGEdit />}

          <LightMode>
            <Button colorScheme="teal" width="full" type="submit">
              Finish
            </Button>
          </LightMode>
        </VStack>
      </form>
    </FormProvider>
  );
}

export default ConsumableEditContainer;
