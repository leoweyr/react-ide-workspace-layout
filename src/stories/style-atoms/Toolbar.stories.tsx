import type { Meta, StoryObj } from '@storybook/react';

import Toolbar from '../../components/style-atoms/Toolbar';
import { IconButton } from '../../components/functional-atoms';
import { Icon, menu, folder, settings, Orientation } from '../../components/style-atoms';


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
                <IconButton icon={<Icon name="menu" svg={menu.path} />} />
                <IconButton icon={<Icon name="folder" svg={folder.path} />} />
                <IconButton icon={<Icon name="settings" svg={settings.path} />} />
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
                <IconButton icon={<Icon name="menu" svg={menu.path} />} />
                <IconButton icon={<Icon name="folder" svg={folder.path} />} />
                <IconButton icon={<Icon name="settings" svg={settings.path} />} />
            </>
        ),
    },
};


export default meta;
