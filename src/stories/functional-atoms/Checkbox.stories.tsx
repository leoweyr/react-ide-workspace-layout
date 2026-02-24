import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '../../components/functional-atoms/Checkbox';


const meta = {
    title: 'Atoms/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {
        checked: { control: 'boolean' },
        label: { control: 'text' },
        disabled: { control: 'boolean' },
    },
} satisfies Meta<typeof Checkbox>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        checked: false,
        label: 'Checkbox Option',
    },
};

export const Checked: Story = {
    args: {
        checked: true,
        label: 'Checked Option',
    },
};

export const Disabled: Story = {
    args: {
        checked: false,
        label: 'Disabled Option',
        disabled: true,
    },
};

export const DisabledChecked: Story = {
    args: {
        checked: true,
        label: 'Disabled Checked',
        disabled: true,
    },
};


export default meta;
