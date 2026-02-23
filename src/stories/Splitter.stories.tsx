import type { Meta, StoryObj } from '@storybook/react';

import { Splitter } from '../components/atoms/Splitter';


const meta = {
    title: 'Atoms/Splitter',
    component: Splitter,
    tags: ['autodocs'],
    argTypes: {
        orientation: { control: 'select', options: ['vertical', 'horizontal'] },
        size: { control: 'number' },
    },
} satisfies Meta<typeof Splitter>;

type Story = StoryObj<typeof meta>;


export const Vertical: Story = {
    args: {
        orientation: 'vertical',
        style: { height: '100px' },
    },
};

export const Horizontal: Story = {
    args: {
        orientation: 'horizontal',
        style: { width: '100px' },
    },
};


export default meta;
