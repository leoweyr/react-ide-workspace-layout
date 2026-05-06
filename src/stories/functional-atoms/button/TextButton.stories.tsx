import type { Meta, StoryObj } from '@storybook/react';

import { Size } from '../../../components/style-atoms';
import { TextButton, Tooltip } from '../../../components/functional-atoms';


const meta = {
    title: 'Functional Atoms/TextButton',
    component: TextButton,
    tags: ['autodocs'],
    argTypes: {
        text: { control: 'text' },
        size: { 
            control: 'select', 
            options: [Size.SMALL, Size.MEDIUM, Size.LARGE] 
        },
        disabled: { control: 'boolean' },
        onClick: { action: 'clicked' },
    },
} satisfies Meta<typeof TextButton>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        text: 'Edit',
    },
};

export const Small: Story = {
    args: {
        text: 'Yes',
        size: Size.SMALL,
    },
};

export const WithTooltip: Story = {
    args: {
        text: 'Edit',
        tooltip: <Tooltip text="Edit Menu" />,
    },
};

export const Disabled: Story = {
    args: {
        text: 'None',
        disabled: true,
    },
};


export default meta;
