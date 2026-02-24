import type { Meta, StoryObj } from '@storybook/react';

import Button from '../../components/style-atoms/Button';
import { ButtonVariant } from '../../components/style-atoms/enums/ButtonVariant';
import { ButtonSize } from '../../components/style-atoms/enums/ButtonSize';
import { IconName } from '../../components/style-atoms/enums/IconName';


const meta = {
    title: 'Atoms/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        text: { control: 'text' },
        icon: { 
            control: 'select', 
            options: [IconName.SEARCH, IconName.FILE, IconName.SETTINGS, IconName.FOLDER, IconName.CLOSE, IconName.EXPAND, IconName.COLLAPSE, IconName.MENU] 
        },
        variant: { 
            control: 'select', 
            options: [ButtonVariant.PRIMARY, ButtonVariant.DEFAULT, ButtonVariant.ICON, ButtonVariant.GHOST] 
        },
        size: { 
            control: 'select', 
            options: [ButtonSize.SMALL, ButtonSize.MEDIUM, ButtonSize.LARGE] 
        },
        disabled: { control: 'boolean' },
        active: { control: 'boolean' },
        tooltip: { control: 'text' },
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
        text: 'Run',
        icon: IconName.EXPAND,
        variant: ButtonVariant.GHOST,
    },
};

export const IconOnly: Story = {
    args: {
        icon: IconName.SETTINGS,
        variant: ButtonVariant.ICON,
        tooltip: 'Settings',
    },
};

export const Small: Story = {
    args: {
        text: 'OK',
        variant: ButtonVariant.PRIMARY,
        size: ButtonSize.SMALL,
    },
};

export const Large: Story = {
    args: {
        text: 'Big Action',
        variant: ButtonVariant.DEFAULT,
        size: ButtonSize.LARGE,
    },
};

export const Disabled: Story = {
    args: {
        text: 'Disabled',
        variant: ButtonVariant.DEFAULT,
        disabled: true,
    },
};


export default meta;
