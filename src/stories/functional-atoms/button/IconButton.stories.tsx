import { ReactElement } from 'react';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';

import { IconButton, Tooltip } from '../../../components/functional-atoms';
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
    title: 'Functional Atoms/Button/IconButton',
    component: IconButton,
    tags: ['autodocs'],
    argTypes: {
        icon: { 
            control: 'select', 
            options: Object.keys(ICON_MAP),
            mapping: ICON_MAP,
        },
        size: { 
            control: 'select', 
            options: [Size.SMALL, Size.MEDIUM, Size.LARGE] 
        },
        tooltip: { control: 'object' },
        onClick: { action: 'clicked' },
    },
    decorators: [
        (Story: StoryFn): ReactElement => (
            <div style={{ padding: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof IconButton>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        icon: <Icon name="settings" svg={settings.path} />,
        tooltip: <Tooltip text="Settings" />,
    },
};

export const Small: Story = {
    args: {
        icon: <Icon name="settings" svg={settings.path} />,
        size: Size.SMALL,
        tooltip: <Tooltip text="Settings" />,
    },
};

export const Large: Story = {
    args: {
        icon: <Icon name="settings" svg={settings.path} />,
        size: Size.LARGE,
        tooltip: <Tooltip text="Settings" />,
    },
};

export const Active: Story = {
    args: {
        icon: <Icon name="settings" svg={settings.path} />,
        active: true,
        tooltip: <Tooltip text="Settings" />,
    },
};

export const Disabled: Story = {
    args: {
        icon: 'CLOSE' as any,
        disabled: true,
        tooltip: <Tooltip text="Close" />,
    },
};


export default meta;
