import type { Meta, StoryObj } from '@storybook/react';

import Tab from '../../components/functional-atoms/Tab';


const meta = {
    title: 'Atoms/Tab',
    component: Tab,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        isActive: { control: 'boolean' },
        isModified: { control: 'boolean' },
        icon: { control: 'select', options: ['file', 'settings'] },
    },
} satisfies Meta<typeof Tab>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        title: 'filename.ts',
        icon: 'file',
    },
};

export const Active: Story = {
    args: {
        title: 'active_file.ts',
        icon: 'file',
        isActive: true,
    },
};

export const Modified: Story = {
    args: {
        title: 'modified_file.ts',
        icon: 'file',
        isModified: true,
    },
};

export const HoverState: Story = {
    args: {
        title: 'hover_me.ts',
        icon: 'file',
    },
    parameters: {
        pseudo: { hover: true },
    },
};


export default meta;
