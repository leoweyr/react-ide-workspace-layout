import type { Meta, StoryObj } from '@storybook/react';

import { 
    Icon, 
    Size, 
    close, 
    collapse, 
    database, 
    expand, 
    file, 
    folder, 
    menu, 
    notifications, 
    problems, 
    run, 
    search, 
    settings, 
    terminal 
} from '../../components/style-atoms';


const meta = {
    title: 'Style Atoms/Icon',
    component: Icon,
    tags: ['autodocs'],
    argTypes: {
        name: { control: 'text' },
        svg: { control: 'text' },
        size: {
            control: 'select',
            options: [Size.SMALL, Size.MEDIUM, Size.LARGE],
        },
        color: { control: 'color' },
    },
} satisfies Meta<typeof Icon>;


type Story = StoryObj<typeof meta>;


export const Close: Story = {
    args: {
        name: 'close',
        svg: close.path,
        size: Size.MEDIUM,
    },
};

export const Collapse: Story = {
    args: {
        name: 'collapse',
        svg: collapse.path,
        size: Size.MEDIUM,
    },
};

export const Database: Story = {
    args: {
        name: 'database',
        svg: database.path,
        size: Size.MEDIUM,
    },
};

export const Expand: Story = {
    args: {
        name: 'expand',
        svg: expand.path,
        size: Size.MEDIUM,
    },
};

export const File: Story = {
    args: {
        name: 'file',
        svg: file.path,
        size: Size.MEDIUM,
    },
};

export const Folder: Story = {
    args: {
        name: 'folder',
        svg: folder.path,
        size: Size.MEDIUM,
    },
};

export const Menu: Story = {
    args: {
        name: 'menu',
        svg: menu.path,
        size: Size.MEDIUM,
    },
};

export const Notifications: Story = {
    args: {
        name: 'notifications',
        svg: notifications.path,
        size: Size.MEDIUM,
    },
};

export const Problems: Story = {
    args: {
        name: 'problems',
        svg: problems.path,
        size: Size.MEDIUM,
    },
};

export const Run: Story = {
    args: {
        name: 'run',
        svg: run.path,
        size: Size.MEDIUM,
    },
};

export const Search: Story = {
    args: {
        name: 'search',
        svg: search.path,
        size: Size.MEDIUM,
    },
};

export const Settings: Story = {
    args: {
        name: 'settings',
        svg: settings.path,
        size: Size.MEDIUM,
    },
};

export const Terminal: Story = {
    args: {
        name: 'terminal',
        svg: terminal.path,
        size: Size.MEDIUM,
    },
};


export default meta;
