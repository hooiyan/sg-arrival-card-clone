import { Center, createStyles, Stepper } from '@mantine/core';
import React, { useState } from 'react';

import Step1Particulars from './Step1Particulars';

const useStyles = createStyles((theme) => ({
  stepper: {
    // backgroundColor: theme.colors.gray[4],
  },
}));

export default function FormStepper() {
  const { classes } = useStyles();
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Center className={classes.stepper}>
      <Stepper
        classNames={{ separator: 'my-separator' }}
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        styles={{ separator: { backgroundColor: 'gray', width: '30px' } }}
      >
        <Stepper.Step
          // allowStepClick={false}
          // allowStepSelect={false}
          label="Particulars"
        >
          <Step1Particulars />
        </Stepper.Step>
        <Stepper.Step
          // allowStepClick={false}
          // allowStepSelect={false}
          label="Trip"
        ></Stepper.Step>
        <Stepper.Step
          // allowStepClick={false}
          // allowStepSelect={false}
          label="Preview"
        ></Stepper.Step>
        <Stepper.Step
          // allowStepClick={false}
          // allowStepSelect={false}
          label="Submit"
        ></Stepper.Step>
        <Stepper.Completed></Stepper.Completed>
      </Stepper>
    </Center>
  );
}
