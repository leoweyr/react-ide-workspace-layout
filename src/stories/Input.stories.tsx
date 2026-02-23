import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '../components/atoms/Input';


const meta = {
    title: 'Atoms/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {
        value: { control: 'text' },
        placeholder: { control: 'text' },
        icon: { control: 'select', options: ['search', 'file', 'settings'] },
        fullWidth: { control: 'boolean' },
        borderless: { control: 'boolean' },
    },
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        placeholder: 'Enter text...',
    },
};

export const WithIcon: Story = {
    args: {
        placeholder: 'Search...',
        icon: 'search',
    },
};

export const FullWidth: Story = {
    args: {
        placeholder: 'Full width input',
        fullWidth: true,
    },
};

export const Borderless: Story = {
    args: {
        placeholder: 'Borderless input',
        borderless: true,
        value: 'Some value',
    },
};


export default meta;
