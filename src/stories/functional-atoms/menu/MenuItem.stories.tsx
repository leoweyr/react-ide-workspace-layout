import type { Meta, StoryObj } from '@storybook/react';

import { MenuItem } from '../../../components/functional-atoms/menu';
import { Label, JETBRAINS_ICONS } from '../../../components/style-atoms';


const meta = {
    title: 'Functional Atoms/Menu/MenuItem',
    component: MenuItem,
    tags: ['autodocs'],
} satisfies Meta<typeof MenuItem>;

type Story = StoryObj<typeof meta>;


export const TextOnly: Story = {
    args: {
        children: <Label text="Just Text" />,
    },
};

export const WithIcon: Story = {
    args: {
        children: [
            JETBRAINS_ICONS.Folder,
            <Label key="open" text="Open" />
        ],
    },
};


export default meta;
