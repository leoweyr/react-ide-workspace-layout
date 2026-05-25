import { ReactElement } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { MenuContainer, MenuItem, OptionMenuItem } from '../../../components/functional-atoms';
import { Label, JETBRAINS_ICONS } from '../../../components/style-atoms';


const meta = {
    title: 'Functional Atoms/Menu/MenuContainer',
    component: MenuContainer,
    tags: ['autodocs'],
} satisfies Meta<typeof MenuContainer>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        items: [
            <MenuItem key="new" onClick={(): void => console.log('New')}>
                <Label text="New" />
            </MenuItem>,
            <MenuItem key="open" onClick={(): void => console.log('Open')}>
                <Label text="Open" />
            </MenuItem>,
            <MenuItem key="save-as" onClick={(): void => console.log('Save As')}>
                <Label text="Save As" />
            </MenuItem>,
            <MenuItem key="recent-projects" onClick={(): void => console.log('Recent Projects')}>
                <Label text="Recent Projects" />
            </MenuItem>,
            <MenuItem key="close-project" onClick={(): void => console.log('Close Project')}>
                <Label text="Close Project" />
            </MenuItem>,
            <MenuItem key="rename-project" onClick={(): void => console.log('Rename Project')}>
                <Label text="Rename Project" />
            </MenuItem>
        ] as ReactElement<any, typeof MenuItem>[],
    },
};

export const WithIconsAndVaryingLengths: Story = {
    args: {
        items: [
            <MenuItem key="new" onClick={(): void => console.log('New')}>
                {JETBRAINS_ICONS.Add}
                <Label text="New" />
            </MenuItem>,
            <MenuItem key="open" onClick={(): void => console.log('Open')}>
                {JETBRAINS_ICONS.Folder}
                <Label text="Open" />
            </MenuItem>,
            <MenuItem key="long" onClick={(): void => console.log('Copy Path')}>
                {JETBRAINS_ICONS.Copy}
                <Label text="Copy Path... (This is a very long menu item that determines the width)" />
            </MenuItem>,
        ] as ReactElement<any, typeof MenuItem>[],
    },
};

export const WithOptionMenuItems: Story = {
    args: {
        items: [
            <OptionMenuItem
                key="new"
                text="New"
                rightSide={JETBRAINS_ICONS.ChevronRight}
            />,
            <OptionMenuItem
                key="open"
                text="Open"
                icon={JETBRAINS_ICONS.Folder}
            />,
            <OptionMenuItem
                key="save-as"
                text="Save As..."
                rightSide={<Label text="Ctrl + Shift + S" />}
            />,
            <OptionMenuItem
                key="recent-projects"
                text="Recent Projects"
                rightSide={JETBRAINS_ICONS.ChevronRight}
            />,
            <OptionMenuItem
                key="close-project"
                text="Close Project"
            />,
            <OptionMenuItem
                key="rename-projects"
                text="Rename Projects..."
            />
        ] as any[]
    }
};


export default meta;
