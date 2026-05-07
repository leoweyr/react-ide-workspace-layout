import { ReactElement } from 'react';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';

import { IconButton, Tooltip } from '../../../components/functional-atoms';
import { Size } from '../../../components/style-atoms';
import { JETBRAINS_ICONS } from '../../../components/style-atoms';


const meta = {
    title: 'Functional Atoms/Button/IconButton',
    component: IconButton,
    tags: ['autodocs'],
    argTypes: {
        icon: { 
            control: 'select', 
            options: Object.keys(JETBRAINS_ICONS),
            mapping: JETBRAINS_ICONS,
        },
        size: { 
            control: 'select', 
            options: [Size.SMALL, Size.MEDIUM, Size.LARGE] 
        },
        tooltip: { control: 'object' },
        onClick: { action: 'clicked' },
    },
    decorators: [
        (Story: StoryFn): ReactElement => (
            <div style={{ padding: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof IconButton>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        icon: JETBRAINS_ICONS.Settings,
        tooltip: <Tooltip text="Settings" />,
    },
};

export const Small: Story = {
    args: {
        icon: JETBRAINS_ICONS.Settings,
        size: Size.SMALL,
        tooltip: <Tooltip text="Settings" />,
    },
};

export const Large: Story = {
    args: {
        icon: JETBRAINS_ICONS.Settings,
        size: Size.LARGE,
        tooltip: <Tooltip text="Settings" />,
    },
};

export const Active: Story = {
    args: {
        icon: JETBRAINS_ICONS.Settings,
        active: true,
        tooltip: <Tooltip text="Settings" />,
    },
};

export const Disabled: Story = {
    args: {
        icon: JETBRAINS_ICONS.Close,
        disabled: true,
        tooltip: <Tooltip text="Close" />,
    },
};


export default meta;
