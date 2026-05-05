import type { Meta, StoryObj } from '@storybook/react';

import Icon from '../../components/style-atoms/icon/Icon';
import { Size } from '../../components/style-atoms';
import ai from '../../components/style-atoms/icon/schema/ai.json';
import build from '../../components/style-atoms/icon/schema/build.json';
import close from '../../components/style-atoms/icon/schema/close.json';
import collapse from '../../components/style-atoms/icon/schema/collapse.json';
import database from '../../components/style-atoms/icon/schema/database.json';
import expand from '../../components/style-atoms/icon/schema/expand.json';
import file from '../../components/style-atoms/icon/schema/file.json';
import folder from '../../components/style-atoms/icon/schema/folder.json';
import menu from '../../components/style-atoms/icon/schema/menu.json';
import notifications from '../../components/style-atoms/icon/schema/notifications.json';
import problems from '../../components/style-atoms/icon/schema/problems.json';
import search from '../../components/style-atoms/icon/schema/search.json';
import services from '../../components/style-atoms/icon/schema/services.json';
import settings from '../../components/style-atoms/icon/schema/settings.json';
import terminal from '../../components/style-atoms/icon/schema/terminal.json';


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


export const Ai: Story = {
    args: {
        name: 'ai',
        svg: ai.path,
        size: Size.MEDIUM,
    },
};

export const Build: Story = {
    args: {
        name: 'build',
        svg: build.path,
        size: Size.MEDIUM,
    },
};

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

export const Search: Story = {
    args: {
        name: 'search',
        svg: search.path,
        size: Size.MEDIUM,
    },
};

export const Services: Story = {
    args: {
        name: 'services',
        svg: services.path,
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
