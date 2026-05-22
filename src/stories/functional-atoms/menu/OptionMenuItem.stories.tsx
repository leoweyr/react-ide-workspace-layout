import type { Meta, StoryObj } from '@storybook/react';

import { OptionMenuItem } from '../../../components/functional-atoms';
import { Label, JETBRAINS_ICONS } from '../../../components/style-atoms';


const meta = {
    title: 'Functional Atoms/Menu/OptionMenuItem',
    component: OptionMenuItem,
    tags: ['autodocs'],
} satisfies Meta<typeof OptionMenuItem>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        text: 'New',
    },
};

export const WithIcon: Story = {
    args: {
        text: 'Open',
        icon: JETBRAINS_ICONS.Folder,
    },
};

export const WithRightSideLabel: Story = {
    args: {
        text: 'Save As...',
        icon: JETBRAINS_ICONS.Save,
        rightSide: <Label text="Ctrl+Shift+S" />,
    },
};

export const WithRightSideIcon: Story = {
    args: {
        text: 'Recent Projects',
        icon: JETBRAINS_ICONS.Tools,
        rightSide: JETBRAINS_ICONS.ChevronRight,
    },
};

export const MinimumSpacingBetweenTextAndRightSideLabel: Story = {
    args: {
        text: 'This is A Very Long Menu Item Text that Will Demonstrate the Spacing between Text and Right Side',
        rightSide: <Label text="Ctrl+Alt+Shift+S" />,
    },
    render: (args) => (
        <div style={{ width: '350px', border: '1px solid #ccc' }}>
            <OptionMenuItem {...args} />
        </div>
    )
};

export const MinimumSpacingBetweenTextAndRightSideIcon: Story = {
    args: {
        text: 'This is A Very Long Menu Item Text that Will Demonstrate the Spacing between Text and Right Side',
        rightSide: JETBRAINS_ICONS.ChevronRight,
    },
    render: (args) => (
        <div style={{ width: '350px', border: '1px solid #ccc' }}>
            <OptionMenuItem {...args} />
        </div>
    )
};


export default meta;
