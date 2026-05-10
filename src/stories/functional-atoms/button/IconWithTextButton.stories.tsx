import type { Meta, StoryObj } from '@storybook/react';

import { IconWithTextButton } from '../../../components/functional-atoms/button';
import { JETBRAINS_ICONS, Size } from '../../../components/style-atoms';
import { Tooltip } from '../../../components/functional-atoms/tooltip';


const meta = {
    title: 'Functional Atoms/Button/IconWithTextButton',
    component: IconWithTextButton,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: [Size.SMALL, Size.MEDIUM, Size.LARGE],
        },
    },
} satisfies Meta<typeof IconWithTextButton>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        icon: JETBRAINS_ICONS.FileJspx,
        text: 'IconWithButton.jsx',
    },
};

export const WithTooltip: Story = {
    args: {
        icon: JETBRAINS_ICONS.Info,
        text: 'Help',
        tooltip: <Tooltip text="Click for Help Documentation" />,
    },
};

export const Large: Story = {
    args: {
        icon: JETBRAINS_ICONS.Run,
        text: 'Run Application',
        size: Size.LARGE
    },
};


export default meta;
