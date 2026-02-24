import type { Meta, StoryObj } from '@storybook/react';

import Icon from '../../components/style-atoms/Icon';


const meta = {
    title: 'Atoms/Icon',
    component: Icon,
    tags: ['autodocs'],
    argTypes: {
        name: { control: 'select', options: ['close', 'expand', 'collapse', 'folder', 'file', 'search', 'settings', 'menu'] },
        size: { control: 'number' },
        color: { control: 'color' },
    },
} satisfies Meta<typeof Icon>;

type Story = StoryObj<typeof meta>;


export const Folder: Story = {
    args: {
        name: 'folder',
        size: 24,
        color: '#bbbbbb',
    },
};

export const File: Story = {
    args: {
        name: 'file',
        size: 24,
        color: '#bbbbbb',
    },
};

export const Search: Story = {
    args: {
        name: 'search',
        size: 24,
        color: '#bbbbbb',
    },
};

export const CustomColor: Story = {
    args: {
        name: 'settings',
        size: 32,
        color: '#2f65ca',
    },
};


export default meta;
