import type { Meta, StoryObj } from '@storybook/react';

import { Size } from '../../../components/style-atoms';
import { Button, ButtonVariant, Tooltip } from '../../../components/functional-atoms';
import { JETBRAINS_ICONS } from '../../../components/style-atoms';


const ICON_OPTIONS = {
    NONE: undefined,
    ...JETBRAINS_ICONS,
};

const meta = {
    title: 'Functional Atoms/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        text: { control: 'text' },
        icon: { 
            control: 'select', 
            options: Object.keys(ICON_OPTIONS),
            mapping: ICON_OPTIONS,
        },
        variant: { 
            control: 'select', 
            options: [ButtonVariant.PRIMARY, ButtonVariant.DEFAULT, ButtonVariant.ICON, ButtonVariant.GHOST] 
        },
        size: { 
            control: 'select', 
            options: [Size.SMALL, Size.MEDIUM, Size.LARGE] 
        },
        disabled: { control: 'boolean' },
        active: { control: 'boolean' },
        tooltip: { control: 'object' },
        onClick: { action: 'clicked' },
    },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;


export const Primary: Story = {
    args: {
        text: 'Commit',
        variant: ButtonVariant.PRIMARY,
    },
};

export const Default: Story = {
    args: {
        text: 'Cancel',
        variant: ButtonVariant.DEFAULT,
    },
};

export const Ghost: Story = {
    args: {
        text: 'Terminal',
        variant: ButtonVariant.GHOST,
    },
};

export const WithIcon: Story = {
    args: {
        text: 'Run Project',
        icon: JETBRAINS_ICONS.Run,
        variant: ButtonVariant.PRIMARY,
    },
};

export const IconOnly: Story = {
    args: {
        icon: JETBRAINS_ICONS.Settings,
        variant: ButtonVariant.ICON,
        tooltip: <Tooltip text="Settings" />,
    },
};

export const Active: Story = {
    args: {
        text: 'Search Results',
        icon: JETBRAINS_ICONS.Search,
        variant: ButtonVariant.GHOST,
        active: true,
    },
};

export const Disabled: Story = {
    args: {
        text: 'Disabled Action',
        variant: ButtonVariant.PRIMARY,
        disabled: true,
    },
};

export const Small: Story = {
    args: {
        text: 'OK',
        variant: ButtonVariant.PRIMARY,
        size: Size.SMALL,
    },
};

export const Large: Story = {
    args: {
        text: 'Large Button',
        variant: ButtonVariant.DEFAULT,
        size: Size.LARGE,
    },
};

export const LongText: Story = {
    args: {
        text: 'This is a very long button text to test the layout and horizontal expansion of the component',
        variant: ButtonVariant.DEFAULT,
    },
};


export default meta;
