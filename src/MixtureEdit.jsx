import { Heading, VStack } from "@chakra-ui/react";
import NumberInputControl from "form/NumberInputControl";
import React from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useLocation } from "react-router";

function MixtureEdit({ mixture }) {
  const isNew = !mixture.id;
  const { control } = useFormContext();

  return (
    <VStack width="full" alignItems="start" padding="4" spacing="4">
      <Heading size="xl">{isNew ? "Create" : "Edit"} mixture</Heading>

      <NumberInputControl
        control={control}
        name="amount"
        label="Amount"
        placeholder="Amount..."
        rules={{ required: true }}
      />

      <NumberInputControl
        control={control}
        name="desiredNicotineStrength"
        label="Desired nicotine strength"
        placeholder="Desired nicotine strength..."
        rules={{ required: true }}
      />

      <NumberInputControl
        control={control}
        name="nicotineStrength"
        label="Nicotine strength"
        placeholder="Nicotine strength..."
        rules={{ required: true }}
      />

      <NumberInputControl
        control={control}
        name="nicotinePG"
        label="Nicotine PG"
        placeholder="Nicotine PG..."
        rules={{ required: true }}
      />

      <NumberInputControl
        control={control}
        name="nicotineVG"
        label="Nicotine VG"
        placeholder="Nicotine VG..."
        rules={{ required: true }}
      />
    </VStack>
  );
}

function MixtureEditContainer() {
  const { state = {} } = useLocation();
  const { mixture } = state;
  const isNew = !mixture.id;

  const methods = useForm({
    defaultValues: {
      amount: 100,
      nicotineStrength: 18,
      desiredNicotineStrength: 1,
      nicotineVG: 50,
      nicotinePG: 50,
    },
  });

  function submit(newMixture) {}

  return (
    <FormProvider {...methods}>
      <form style={{ flex: 1 }} onSubmit={methods.handleSubmit(submit)}>
        <MixtureEdit mixture={mixture} />
      </form>
    </FormProvider>
  );
}

export default MixtureEditContainer;
