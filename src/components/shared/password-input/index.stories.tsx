import React from 'react';

import { StoryFn, Meta } from '@storybook/react';

import { PasswordInput } from '.';

export default {
  title: 'Assets/PasswordInput',
  component: PasswordInput,
} as Meta<typeof PasswordInput>;

export const WithLabel: StoryFn<typeof PasswordInput> = () => (
  <PasswordInput id="withLabel" name="passwordWithLabel" label="With Password" onChange={console.log} />
);

export const WithoutLabel: StoryFn<typeof PasswordInput> = () => (
  <PasswordInput id="withoutLabel" name="passwordWithoutLabel" onChange={console.log} />
);
