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
import { Button, ButtonVariant, Tooltip } from '../../components/functional-atoms';


const ICON_MAP = {
    NONE: undefined,
    CLOSE: <Icon name="close" svg={close.path} />,
    COLLAPSE: <Icon name="collapse" svg={collapse.path} />,
    DATABASE: <Icon name="database" svg={database.path} />,
    EXPAND: <Icon name="expand" svg={expand.path} />,
    FILE: <Icon name="file" svg={file.path} />,
    FOLDER: <Icon name="folder" svg={folder.path} />,
    MENU: <Icon name="menu" svg={menu.path} />,
    NOTIFICATIONS: <Icon name="notifications" svg={notifications.path} />,
    PROBLEMS: <Icon name="problems" svg={problems.path} />,
    RUN: <Icon name="run" svg={run.path} />,
    SEARCH: <Icon name="search" svg={search.path} />,
    SETTINGS: <Icon name="settings" svg={settings.path} />,
    TERMINAL: <Icon name="terminal" svg={terminal.path} />,
};


const meta = {
    title: 'Functional Atoms/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        text: { control: 'text' },
        icon: { 
            control: 'select', 
            options: Object.keys(ICON_MAP),
            mapping: ICON_MAP,
        },
        variant: { 
            control: 'select', 
            options: [ButtonVariant.PRIMARY, ButtonVariant.DEFAULT, ButtonVariant.ICON, ButtonVariant.GHOST] 
        },
        size: { 
            control: 'select', 
            options: [Size.SMALL, Size.MEDIUM, Size.LARGE] 
        },
        disabled: { control: 'boolean' },
        active: { control: 'boolean' },
        tooltip: { control: 'object' },
        onClick: { action: 'clicked' },
    },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;


export const Primary: Story = {
    args: {
        text: 'Commit',
        variant: ButtonVariant.PRIMARY,
    },
};

export const Default: Story = {
    args: {
        text: 'Cancel',
        variant: ButtonVariant.DEFAULT,
    },
};

export const Ghost: Story = {
    args: {
        text: 'Terminal',
        variant: ButtonVariant.GHOST,
    },
};

export const WithIcon: Story = {
    args: {
        text: 'Run Project',
        icon: 'RUN' as any,
        variant: ButtonVariant.PRIMARY,
    },
};

export const IconOnly: Story = {
    args: {
        icon: <Icon name="settings" svg={settings.path} />,
        variant: ButtonVariant.ICON,
        tooltip: <Tooltip text="Settings" />,
    },
};

export const Active: Story = {
    args: {
        text: 'Search Results',
        icon: <Icon name="search" svg={search.path} />,
        variant: ButtonVariant.GHOST,
        active: true,
    },
};

export const Disabled: Story = {
    args: {
        text: 'Disabled Action',
        variant: ButtonVariant.PRIMARY,
        disabled: true,
    },
};

export const Small: Story = {
    args: {
        text: 'OK',
        variant: ButtonVariant.PRIMARY,
        size: Size.SMALL,
    },
};

export const Large: Story = {
    args: {
        text: 'Large Button',
        variant: ButtonVariant.DEFAULT,
        size: Size.LARGE,
    },
};

export const LongText: Story = {
    args: {
        text: 'This is a very long button text to test the layout and horizontal expansion of the component',
        variant: ButtonVariant.DEFAULT,
    },
};


export default meta;
