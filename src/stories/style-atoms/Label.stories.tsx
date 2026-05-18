import type { Meta, StoryObj } from '@storybook/react';

import { JETBRAINS_ICONS, Size } from '../../components/style-atoms';
import Label from '../../components/style-atoms/Label';


const ICON_OPTIONS = {
    NONE: undefined,
    ...JETBRAINS_ICONS
}

const meta = {
    title: 'Style Atoms/Label',
    component: Label,
    tags: ['autodocs'],
    argTypes: {
        text: { control: 'text' },
        icon: {
          control: 'select',
          options: Object.keys(ICON_OPTIONS),
          mapping: ICON_OPTIONS
        },
        size: {
            control: 'select',
            options: [Size.MEDIUM, Size.SMALL, Size.LARGE]
        },
        html: { control: 'boolean' },
        copyable: { control: 'boolean' },
        disabled: { control: 'boolean' }
    },
} satisfies Meta<typeof Label>;

type Story = StoryObj<typeof meta>;


export const WithIcon: Story = {
    args: {
        text: 'Label.jsx',
        icon: JETBRAINS_ICONS.FileJspx,
    },
};

export const SmallDisabled: Story = {
    args: {
        text: 'Small Disabled Label',
        size: Size.SMALL,
        disabled: true,
    },
};

export const Large: Story = {
    args: {
        text: 'Large Label',
        size: Size.LARGE
    },
};

export const Copyable: Story = {
    args: {
        text: 'Select Me',
        copyable: true,
    },
};

export const HtmlContent: Story = {
    args: {
        text: '<b>Bold</b> <i>Italic</i>',
        html: true,
    },
};


export default meta;
