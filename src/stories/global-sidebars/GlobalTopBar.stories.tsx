import type { Meta, StoryObj } from '@storybook/react';

import { GlobalTopBar } from '../../components/global-sidebars';
import {
    Icon,
    JETBRAINS_ICONS, Size
} from '../../components/style-atoms';
import { 
    TextButton, 
    IconButton, 
    DropDownMenuButton, 
    Tooltip 
} from '../../components/functional-atoms';
import logo from '../../../assets/icon.svg';


const meta = {
    title: 'Global Sidebars/GlobalTopBar',
    component: GlobalTopBar,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof GlobalTopBar>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        logo: <Icon name="Logo" svg={logo} size={Size.MEDIUM} />,
        menuItems: [
            <TextButton key="file" text="File" />,
            <TextButton key="edit" text="Edit" />,
            <TextButton key="view" text="View" />,
            <TextButton key="navigate" text="Navigate" />,
            <TextButton key="code" text="Code" />,
            <TextButton key="refactor" text="Refactor" />,
            <TextButton key="run" text="Run" />,
            <TextButton key="tools" text="Tools" />,
            <TextButton key="git" text="Git" />,
            <TextButton key="window" text="Window" />,
            <TextButton key="help" text="Help" />,
        ],
        leftActions: [
            <DropDownMenuButton
                key="project"
                icon={JETBRAINS_ICONS.Project}
                text={"Main Project"}
                tooltip={<Tooltip text="Main Project" />}
            />
        ],
        rightActions: [
            <IconButton
                key="search"
                icon={JETBRAINS_ICONS.Search}
                tooltip={<Tooltip text="Search" />}
            />,
            <IconButton 
                key="settings" 
                icon={JETBRAINS_ICONS.Settings} 
                tooltip={<Tooltip text="Settings" />} 
            />
        ],
    },
};


export default meta;
