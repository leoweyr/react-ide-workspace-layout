import type { Meta, StoryObj } from '@storybook/react';

import Toolbar from '../../components/style-atoms/Toolbar';
import { IconButton } from '../../components/functional-atoms';
import { JETBRAINS_ICONS, Orientation } from '../../components/style-atoms';


const meta = {
    title: 'Style Atoms/Toolbar',
    component: Toolbar,
    tags: ['autodocs'],
    argTypes: {
        orientation: { control: 'select', options: ['HORIZONTAL', 'VERTICAL'] },
        gap: { control: 'number' },
        thickness: { control: 'number' },
    },
} satisfies Meta<typeof Toolbar>;

type Story = StoryObj<typeof meta>;


export const Horizontal: Story = {
    args: {
        orientation: Orientation.HORIZONTAL,
        children: (
            <>
                <IconButton icon={JETBRAINS_ICONS.Menu} />
                <IconButton icon={JETBRAINS_ICONS.Folder} />
                <IconButton icon={JETBRAINS_ICONS.Settings} />
            </>
        ),
    },
};

export const Vertical: Story = {
    args: {
        orientation: Orientation.VERTICAL,
        style: { height: '200px' },
        children: (
            <>
                <IconButton icon={JETBRAINS_ICONS.Menu} />
                <IconButton icon={JETBRAINS_ICONS.Folder} />
                <IconButton icon={JETBRAINS_ICONS.Settings} />
            </>
        ),
    },
};


export default meta;
