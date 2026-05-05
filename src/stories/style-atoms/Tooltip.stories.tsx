import { ReactElement } from 'react';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';

import { Tooltip, TooltipPosition, settings, build, ai, terminal } from '../../components/style-atoms';
import { IconButton } from '../../components/functional-atoms';


const meta = {
    title: 'Style Atoms/Tooltip',
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
        anchor: <IconButton svg={settings.path} />,
    },
};

export const Top: Story = {
    args: {
        text: 'Build Project',
        position: TooltipPosition.TOP,
        anchor: <IconButton svg={settings.path} />,
    },
};

export const Left: Story = {
    args: {
        text: 'AI Assistant',
        position: TooltipPosition.LEFT,
        anchor: <IconButton svg={settings.path} />,
    },
};

export const Right: Story = {
    args: {
        text: 'Terminal',
        position: TooltipPosition.RIGHT,
        anchor: <IconButton svg={settings.path} />,
    },
};

export const AlwaysVisible: Story = {
    args: {
        text: 'Always visible tooltip',
        isVisible: true,
        anchor: <IconButton svg={settings.path} />,
    },
};


export default meta;
