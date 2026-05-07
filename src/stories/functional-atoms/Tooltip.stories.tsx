import { ReactElement } from 'react';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';

import { Tooltip, TooltipPosition, Button, ButtonVariant } from '../../components/functional-atoms';
import { Icon, JETBRAINS_ICONS, Size } from '../../components/style-atoms';


const meta = {
    title: 'Functional Atoms/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
    argTypes: {
        text: { control: 'text' },
        position: {
            control: 'select',
            options: [TooltipPosition.TOP, TooltipPosition.BOTTOM, TooltipPosition.LEFT, TooltipPosition.RIGHT],
        },
        isVisible: { control: 'boolean' },
    },
    decorators: [
        (Story: StoryFn): ReactElement => (
            <div style={{ padding: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Tooltip>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        text: 'Settings',
        anchor: <Button icon={JETBRAINS_ICONS.Settings} variant={ButtonVariant.ICON} size={Size.MEDIUM} />,
    },
};

export const Top: Story = {
    args: {
        text: 'Settings',
        position: TooltipPosition.TOP,
        anchor: <Button icon={JETBRAINS_ICONS.Settings} variant={ButtonVariant.ICON} size={Size.MEDIUM} />,
    },
};

export const Left: Story = {
    args: {
        text: 'Settings',
        position: TooltipPosition.LEFT,
        anchor: <Button icon={JETBRAINS_ICONS.Settings} variant={ButtonVariant.ICON} size={Size.MEDIUM} />,
    },
};

export const Right: Story = {
    args: {
        text: 'Settings',
        position: TooltipPosition.RIGHT,
        anchor: <Button icon={JETBRAINS_ICONS.Settings} variant={ButtonVariant.ICON} size={Size.MEDIUM} />,
    },
};

export const AlwaysVisible: Story = {
    args: {
        text: 'Settings',
        isVisible: true,
        anchor: <Button icon={JETBRAINS_ICONS.Settings} variant={ButtonVariant.ICON} size={Size.MEDIUM} />,
    },
};


export default meta;
