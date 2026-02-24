import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from '../../components/style-atoms/Checkbox';


const meta = {
    title: 'Style Atoms/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {
        checked: { control: 'boolean' },
        label: { control: 'text' },
        disabled: { control: 'boolean' },
        isHovered: { control: 'boolean' },
        isFocused: { control: 'boolean' },
    },
} satisfies Meta<typeof Checkbox>;

type Story = StoryObj<typeof meta>;

const DummyInput = <input type="checkbox" style={{ display: 'none' }} />;


export const Default: Story = {
    args: {
        checked: false,
        label: 'Enable feature',
        inputElement: DummyInput,
        isHovered: false,
        isFocused: false,
        disabled: false,
    },
};

export const Checked: Story = {
    args: {
        checked: true,
        label: 'Enable feature',
        inputElement: DummyInput,
        isHovered: false,
        isFocused: false,
        disabled: false,
    },
};

export const Hovered: Story = {
    args: {
        checked: false,
        label: 'Enable feature',
        inputElement: DummyInput,
        isHovered: true,
        isFocused: false,
        disabled: false,
    },
};

export const Focused: Story = {
    args: {
        checked: false,
        label: 'Enable feature',
        inputElement: DummyInput,
        isHovered: false,
        isFocused: true,
        disabled: false,
    },
};

export const Disabled: Story = {
    args: {
        checked: false,
        label: 'Enable feature',
        inputElement: DummyInput,
        isHovered: false,
        isFocused: false,
        disabled: true,
    },
};

export const DisabledChecked: Story = {
    args: {
        checked: true,
        label: 'Enable feature',
        inputElement: DummyInput,
        isHovered: false,
        isFocused: false,
        disabled: true,
    },
};


export default meta;
