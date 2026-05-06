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
} from '../../../components/style-atoms';
import { DropDownMenuButton, Tooltip } from '../../../components/functional-atoms';


const ICON_MAP = {
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
    title: 'Functional Atoms/DropDownMenuButton',
    component: DropDownMenuButton,
    tags: ['autodocs'],
    argTypes: {
        text: { control: 'text' },
        icon: { 
            control: 'select', 
            options: Object.keys(ICON_MAP),
            mapping: ICON_MAP,
        },
        size: { 
            control: 'select', 
            options: [Size.SMALL, Size.MEDIUM, Size.LARGE] 
        },
        disabled: { control: 'boolean' },
        tooltip: { control: 'object' },
        onClick: { action: 'clicked' },
    },
} satisfies Meta<typeof DropDownMenuButton>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        text: 'Main Project',
        icon: <Icon name="folder" svg={folder.path} />,
    },
};

export const WithTooltip: Story = {
    args: {
        text: 'Main Project',
        icon: <Icon name="folder" svg={folder.path} />,
        tooltip: <Tooltip text="Change search context" anchor={null} />,
    },
};

export const Small: Story = {
    args: {
        text: 'Main Project',
        icon: <Icon name="folder" svg={folder.path} />,
        size: Size.SMALL,
    },
};

export const Large: Story = {
    args: {
        text: 'Main Project',
        icon: <Icon name="folder" svg={folder.path} />,
        size: Size.LARGE,
    },
};

export const LongText: Story = {
    args: {
        text: 'A Very Long Project Name that Might Overflow the Button Container',
        icon: <Icon name="folder" svg={folder.path} />,
    },
};

export const Disabled: Story = {
    args: {
        text: 'Select Option',
        icon: <Icon name="menu" svg={menu.path} />,
        disabled: true,
    },
};


export default meta;
