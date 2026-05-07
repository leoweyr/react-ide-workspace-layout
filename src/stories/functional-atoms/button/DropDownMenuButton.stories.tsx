import type { Meta, StoryObj } from '@storybook/react';

import { Size } from '../../../components/style-atoms';
import { DropDownMenuButton, Tooltip } from '../../../components/functional-atoms';
import { JETBRAINS_ICONS } from '../../../components/style-atoms';


const meta = {
    title: 'Functional Atoms/Button/DropDownMenuButton',
    component: DropDownMenuButton,
    tags: ['autodocs'],
    argTypes: {
        text: { control: 'text' },
        icon: { 
            control: 'select', 
            options: Object.keys(JETBRAINS_ICONS),
            mapping: JETBRAINS_ICONS,
        },
        size: { 
            control: 'select', 
            options: [Size.SMALL, Size.MEDIUM, Size.LARGE] 
        },
        disabled: { control: 'boolean' },
        tooltip: { control: 'object' },
        onClick: { action: 'clicked' },
    },
} satisfies Meta<typeof DropDownMenuButton>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        text: 'Main Project',
        icon: JETBRAINS_ICONS.Project,
    },
};

export const WithTooltip: Story = {
    args: {
        text: 'Main Project',
        icon: JETBRAINS_ICONS.Project,
        tooltip: <Tooltip text="Change search context" anchor={null} />,
    },
};

export const Small: Story = {
    args: {
        text: 'Main Project',
        icon: JETBRAINS_ICONS.Project,
        size: Size.SMALL,
    },
};

export const Large: Story = {
    args: {
        text: 'Main Project',
        icon: JETBRAINS_ICONS.Project,
        size: Size.LARGE,
    },
};

export const LongText: Story = {
    args: {
        text: 'A Very Long Project Name that Might Overflow the Button Container',
        icon: JETBRAINS_ICONS.Project,
    },
};

export const Disabled: Story = {
    args: {
        text: 'Select Option',
        icon: JETBRAINS_ICONS.Menu,
        disabled: true,
    },
};


export default meta;
