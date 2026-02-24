import type { Meta, StoryObj } from '@storybook/react';

import List from '../../components/functional-atoms/List';


const meta = {
    title: 'Atoms/List',
    component: List,
    tags: ['autodocs'],
    argTypes: {
        selectedId: { control: 'text' },
    },
} satisfies Meta<typeof List>;

type Story = StoryObj<typeof meta>;

const sampleItems = [
    { id: '1', text: 'Item 1', icon: 'folder' as const, isExpanded: true, children: [
        { id: '1-1', text: 'Child 1', icon: 'file' as const },
        { id: '1-2', text: 'Child 2', icon: 'file' as const },
    ]},
    { id: '2', text: 'Item 2', icon: 'file' as const },
    { id: '3', text: 'Item 3', icon: 'settings' as const },
];


export const Default: Story = {
    args: {
        items: sampleItems,
    },
};

export const WithSelection: Story = {
    args: {
        items: sampleItems,
        selectedId: '1-1',
    },
};


export default meta;
