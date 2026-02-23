import type { Meta, StoryObj } from '@storybook/react';

import { TabbedPane } from '../components/atoms/TabbedPane';
import { IconName } from '../components/atoms/enums/IconName';


const meta = {
    title: 'Atoms/TabbedPane',
    component: TabbedPane,
    tags: ['autodocs'],
    argTypes: {
        activeTabId: { control: 'text' },
    },
    decorators: [
        (Story) => (
            <div style={{ width: '100%', height: '300px', border: '1px solid #ccc' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof TabbedPane>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        tabs: [
            { id: 'tab1', title: 'File 1.ts', icon: IconName.FILE, content: <div style={{ padding: 20 }}>Content 1</div> },
            { id: 'tab2', title: 'File 2.ts', icon: IconName.FILE, content: <div style={{ padding: 20 }}>Content 2</div> },
            { id: 'tab3', title: 'Settings', icon: IconName.SETTINGS, content: <div style={{ padding: 20 }}>Settings Content</div> },
        ],
    },
};

export const Closable: Story = {
    args: {
        tabs: [
            { id: 'tab1', title: 'File 1.ts', icon: IconName.FILE, closable: true, content: <div style={{ padding: 20 }}>Content 1</div> },
            { id: 'tab2', title: 'File 2.ts', icon: IconName.FILE, closable: true, isModified: true, content: <div style={{ padding: 20 }}>Content 2 (Modified)</div> },
        ],
    },
};


export default meta;
