import React from "react";
import { Button, Heading, LightMode, VStack } from "@chakra-ui/react";
import InputControl from "form/InputControl";
import NumberInputControl from "form/NumberInputControl";
import RadioControl from "form/RadioControl";
import SelectControl from "form/SelectControl";
import { useForm, useWatch } from "react-hook-form";
import { useConsumableContext } from "ConsumableContext";
import { useHistory, useLocation } from "react-router";

function FlavorEdit({ onSubmit, consumable }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: consumable.name ?? "",
      amount: consumable.amount ?? 10,
      flavorType: consumable.type ?? "PG",
    },
  });

  return (
    <VStack width="full" alignItems="start" spacing="4" flex="1">
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

      <LightMode>
        <Button
          colorScheme="teal"
          width="full"
          onClick={handleSubmit(onSubmit)}
        >
          Finish
        </Button>
      </LightMode>
    </VStack>
  );
}

function NicotineEdit({ onSubmit, consumable }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      amount: consumable.amount ?? 10,
      pg: consumable.pg ?? 50,
      vg: consumable.vg ?? 50,
      strength: consumable.strength ?? 18,
    },
  });

  return (
    <VStack width="full" alignItems="start" spacing="4" flex="1">
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

      <LightMode>
        <Button
          colorScheme="teal"
          width="full"
          onClick={handleSubmit(onSubmit)}
        >
          Finish
        </Button>
      </LightMode>
    </VStack>
  );
}

function PGEdit({ onSubmit, consumable }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      amount: consumable.amount ?? 10,
    },
  });

  return (
    <VStack width="full" alignItems="start" spacing="4" flex="1">
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

      <LightMode>
        <Button
          colorScheme="teal"
          width="full"
          onClick={handleSubmit(onSubmit)}
        >
          Finish
        </Button>
      </LightMode>
    </VStack>
  );
}

function VGEdit({ onSubmit, consumable }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      amount: consumable.amount ?? 10,
    },
  });

  return (
    <VStack width="full" alignItems="start" spacing="4" flex="1">
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

      <LightMode>
        <Button
          colorScheme="teal"
          width="full"
          onClick={handleSubmit(onSubmit)}
        >
          Finish
        </Button>
      </LightMode>
    </VStack>
  );
}

function ConsumableEditContainer() {
  const { state = {} } = useLocation();
  const { consumable = {} } = state;
  const { consumableService } = useConsumableContext();
  const history = useHistory();

  const isNew = !consumable.id;

  const { control, handleSubmit } = useForm({
    defaultValues: {
      ...consumable,
      type: consumable?.type ?? "flavor",
    },
  });

  const { type } = useWatch({ control });

  async function submit(consumableData) {
    const saveFn = isNew
      ? consumableService.createConsumable
      : consumableService.editConsumable;

    const savedConsumable = await saveFn({
      ...consumableData,
      type,
      id: consumable.id,
    });
    history.push(`/consumable/${savedConsumable.id}`, {
      consumable: savedConsumable,
    });
  }

  return (
    <VStack padding="4" spacing="4" alignItems="start" flex="1">
      <Heading size="xl">{isNew ? "Create" : "Edit"} consumable</Heading>

      <form
        onSubmit={handleSubmit(submit)}
        style={{ width: "100%", flex: 1, display: "flex" }}
      >
        <VStack spacing="4" alignItems="start" flex="1">
          <SelectControl
            label="Consumable type"
            values={[
              { value: "flavor", label: "Flavor" },
              { value: "nicotine", label: "Nicotine" },
              { value: "pg", label: "PG" },
              { value: "vg", label: "VG" },
            ]}
            control={control}
            name="type"
          />

          {type === "flavor" && (
            <FlavorEdit onSubmit={submit} consumable={consumable} />
          )}
          {type === "nicotine" && (
            <NicotineEdit onSubmit={submit} consumable={consumable} />
          )}
          {type === "pg" && (
            <PGEdit onSubmit={submit} consumable={consumable} />
          )}
          {type === "vg" && (
            <VGEdit onSubmit={submit} consumable={consumable} />
          )}
        </VStack>
      </form>
    </VStack>
  );
}

export default ConsumableEditContainer;
