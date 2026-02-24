import type { Meta, StoryObj } from '@storybook/react';

import ProgressBar from '../../components/style-atoms/ProgressBar';


const meta = {
    title: 'Atoms/ProgressBar',
    component: ProgressBar,
    tags: ['autodocs'],
    argTypes: {
        value: { control: { type: 'range', min: 0, max: 100 } },
        max: { control: 'number' },
        showLabel: { control: 'boolean' },
        indeterminate: { control: 'boolean' },
    },
} satisfies Meta<typeof ProgressBar>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        value: 50,
        max: 100,
    },
};

export const WithLabel: Story = {
    args: {
        value: 75,
        max: 100,
        showLabel: true,
    },
};

export const Completed: Story = {
    args: {
        value: 100,
        max: 100,
        showLabel: true,
    },
};


export default meta;
