import type { Meta, StoryObj } from '@storybook/react';

import Input from '../../components/style-atoms/Input';
import { IconName } from '../../components/style-atoms/enums/IconName';


const meta = {
    title: 'Style Atoms/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {
        value: { control: 'text' },
        placeholder: { control: 'text' },
        icon: { control: 'select', options: Object.values(IconName) },
        fullWidth: { control: 'boolean' },
        borderless: { control: 'boolean' },
        isFocused: { control: 'boolean' },
        isHovered: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        placeholder: 'Enter text...',
        isFocused: false,
        isHovered: false,
        fullWidth: false,
    },
};

export const WithValue: Story = {
    args: {
        value: 'Hello World',
        isFocused: false,
        isHovered: false,
        fullWidth: false,
    },
};

export const WithIcon: Story = {
    args: {
        placeholder: 'Search...',
        icon: IconName.SEARCH,
        isFocused: false,
        isHovered: false,
        fullWidth: false,
    },
};

export const Focused: Story = {
    args: {
        placeholder: 'Enter text...',
        isFocused: true,
        isHovered: false,
        fullWidth: false,
    },
};

export const Hovered: Story = {
    args: {
        placeholder: 'Enter text...',
        isFocused: false,
        isHovered: true,
        fullWidth: false,
    },
};

export const Borderless: Story = {
    args: {
        value: 'Borderless Input',
        borderless: true,
        isFocused: false,
        isHovered: false,
        fullWidth: false,
    },
};


export default meta;
