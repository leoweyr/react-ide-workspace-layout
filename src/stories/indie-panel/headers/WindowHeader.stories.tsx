import { cloneElement, ReactElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import WindowHeader from '../../../components/indie-panel/headers/WindowHeader';
import { IconButton, Tooltip } from '../../../components/functional-atoms';
import { Icon, JETBRAINS_ICONS } from '../../../components/style-atoms';


const meta = {
    title: 'Indie Panel/Headers/WindowHeader',
    component: WindowHeader,
    tags: ['autodocs'],
    argTypes: {
        isFocused: { control: 'boolean' },
    }
} satisfies Meta<typeof WindowHeader>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        title: 'Project',
        isFocused: true,
        rightActions: [
            <IconButton
                key="options"
                icon={cloneElement(JETBRAINS_ICONS.MoreOptions, {
                    rotate: 90
                }) as ReactElement<any, typeof Icon>}
                tooltip={<Tooltip text="Options" />}
            />,
        ],
    },
};

export const Unfocused: Story = {
    args: {
        title: 'Project',
        isFocused: false,
        rightActions: [
            <IconButton
                key="options"
                icon={cloneElement(JETBRAINS_ICONS.MoreOptions, {
                    rotate: 90
                }) as ReactElement<any, typeof Icon>}
                tooltip={<Tooltip text="Options" />}
            />,
        ],
    },
};


export default meta;
