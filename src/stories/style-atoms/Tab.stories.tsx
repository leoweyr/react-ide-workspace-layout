import type { Meta, StoryObj } from '@storybook/react';

import Tab from '../../components/style-atoms/Tab';
import { IconName } from '../../components/style-atoms/enums/IconName';


const meta = {
    title: 'Style Atoms/Tab',
    component: Tab,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        isActive: { control: 'boolean' },
        isModified: { control: 'boolean' },
        isHovered: { control: 'boolean' },
        isCloseHovered: { control: 'boolean' },
        icon: { control: 'select', options: Object.values(IconName) },
    },
} satisfies Meta<typeof Tab>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        title: 'index.ts',
        icon: IconName.FILE,
        isActive: false,
        isModified: false,
        isHovered: false,
        isCloseHovered: false,
    },
};

export const Active: Story = {
    args: {
        title: 'index.ts',
        icon: IconName.FILE,
        isActive: true,
        isModified: false,
        isHovered: false,
        isCloseHovered: false,
    },
};

export const Hovered: Story = {
    args: {
        title: 'index.ts',
        icon: IconName.FILE,
        isActive: false,
        isModified: false,
        isHovered: true,
        isCloseHovered: false,
    },
};

export const Modified: Story = {
    args: {
        title: 'index.ts',
        icon: IconName.FILE,
        isActive: false,
        isModified: true,
        isHovered: false,
        isCloseHovered: false,
    },
};

export const ModifiedHovered: Story = {
    args: {
        title: 'index.ts',
        icon: IconName.FILE,
        isActive: false,
        isModified: true,
        isHovered: true,
        isCloseHovered: false,
    },
};

export const CloseHovered: Story = {
    args: {
        title: 'index.ts',
        icon: IconName.FILE,
        isActive: false,
        isModified: false,
        isHovered: true,
        isCloseHovered: true,
    },
};


export default meta;
