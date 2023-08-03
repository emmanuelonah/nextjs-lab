import React from 'react';

import { StoryFn, Meta } from '@storybook/react';

import { If } from '.';

export default {
  title: 'Assets/If',
  component: If,
} as Meta<typeof If>;

export const DoNode: StoryFn<typeof If> = () => (
  <If condition={true} do="Render me the 'Do Node 🤗'" else="Don't render me 😥" />
);

export const ElseNode: StoryFn<typeof If> = () => (
  <If condition={false} do="Don't the 'Do Node 😥" else="Render render me the 'Else Node🤗'" />
);
