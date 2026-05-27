import { ReactElement, cloneElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { MenuContainer, MenuItem, OptionMenuItem } from '../../../components/functional-atoms';
import { Label, JETBRAINS_ICONS, HeavyDivider, LightDivider, Icon } from '../../../components/style-atoms';


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
                icon={cloneElement(JETBRAINS_ICONS.Folder, { color: '#8D98B6' }) as ReactElement<any, typeof Icon>}
            />,
            <OptionMenuItem
                key="save-as"
                text="Save As..."
                rightSide={<Label text="<font color=#8D98B6>Ctrl + Shift + S</font>" html={true}/>}
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
            />,
            <HeavyDivider
                key="heavy-divider-1"
            />,
            <OptionMenuItem
                key="remote-development..."
                text="Remote Development..."
            />,
            <LightDivider
                key="light-divider-1"
            />,
            <OptionMenuItem
                key="settings"
                text="Settings..."
                icon={cloneElement(JETBRAINS_ICONS.Settings, { color: '#8D98B6' }) as ReactElement<any, typeof Icon>}
                rightSide={<Label text="<font color=#8D98B6>Ctrl + Alt + S</font>" html={true}/>}
            />,
            <OptionMenuItem
                key="file-properties"
                text="File Properties"
                rightSide={JETBRAINS_ICONS.ChevronRight}
            />,
            <HeavyDivider
                key="heavy-divider-2"
            />,
            <OptionMenuItem
                key="local-history"
                text="Local History"
                rightSide={JETBRAINS_ICONS.ChevronRight}
            />,
            <LightDivider
                key="light-divider-2"
            />,
            <OptionMenuItem
                key="save-all"
                text="Save All"
                rightSide={<Label text="<font color=#8D98B6>Ctrl + S</font>" html={true}/>}
            />,
            <OptionMenuItem
                key="reload-all-from-disk"
                text="Reload All from Disk"
                icon={cloneElement(JETBRAINS_ICONS.Update, { color: '#8D98B6' }) as ReactElement<any, typeof Icon>}
                rightSide={<Label text="<font color=#8D98B6>Ctrl + Alt + Y</font>" html={true}/>}
            />,
            <OptionMenuItem
                key="repair-ide"
                text="Repair IDE"
            />,
            <OptionMenuItem
                key="invalidate-caches"
                text="Invalidate Caches..."
            />,
            <HeavyDivider
                key="heavy-divider-3"
            />,
            <OptionMenuItem
                key="manage-ide-settings"
                text="Manage IDE Settings"
                rightSide={JETBRAINS_ICONS.ChevronRight}
            />,
            <OptionMenuItem
                key="new-projects-setup"
                text="New Projects Setup"
                rightSide={JETBRAINS_ICONS.ChevronRight}
            />,
            <OptionMenuItem
                key="save-file-as-template"
                text="Save File as Template..."
            />,
            <LightDivider
                key="light-divider-3"
            />,
            <OptionMenuItem
                key="export"
                text="Export"
                rightSide={JETBRAINS_ICONS.ChevronRight}
            />,
            <OptionMenuItem
                key="print"
                text="Print..."
                icon={cloneElement(JETBRAINS_ICONS.Printer, { color: '#8D98B6' }) as ReactElement<any, typeof Icon>}
            />,
            <HeavyDivider
                key="heavy-divider-4"
            />,
            <OptionMenuItem
                key="power-save-mode"
                text="Power Save Mode"
            />,
            <LightDivider
                key="light-divider-4"
            />,
            <OptionMenuItem
                key="exit"
                text="Exit"
            />
        ] as any[]
    }
};


export default meta;
