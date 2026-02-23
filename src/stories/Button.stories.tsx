import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../components/atoms/Button';


const meta = {
    title: 'Atoms/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        text: { control: 'text' },
        icon: { control: 'select', options: ['close', 'expand', 'collapse', 'folder', 'file', 'search', 'settings', 'menu'] },
        variant: { control: 'select', options: ['primary', 'default', 'icon', 'ghost'] },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
        disabled: { control: 'boolean' },
        active: { control: 'boolean' },
        tooltip: { control: 'text' },
    },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;


export const Primary: Story = {
    args: {
        text: 'Commit',
        variant: 'primary',
    },
};

export const Default: Story = {
    args: {
        text: 'Cancel',
        variant: 'default',
    },
};

export const Ghost: Story = {
    args: {
        text: 'Run',
        icon: 'expand',
        variant: 'ghost',
    },
};

export const IconOnly: Story = {
    args: {
        icon: 'settings',
        variant: 'icon',
        tooltip: 'Settings',
    },
};

export const Small: Story = {
    args: {
        text: 'OK',
        variant: 'primary',
        size: 'sm',
    },
};

export const Large: Story = {
    args: {
        text: 'Big Action',
        variant: 'default',
        size: 'lg',
    },
};

export const Disabled: Story = {
    args: {
        text: 'Disabled',
        variant: 'default',
        disabled: true,
    },
};


export default meta;
