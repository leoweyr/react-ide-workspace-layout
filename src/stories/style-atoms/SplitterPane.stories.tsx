import type { Meta, StoryObj } from '@storybook/react';

import SplitterPane from '../../components/style-atoms/SplitterPane';


const meta = {
    title: 'Style Atoms/SplitterPane',
    component: SplitterPane,
    tags: ['autodocs'],
    argTypes: {
        size: { control: 'text' },
        isFlexible: { control: 'boolean' },
        children: { control: 'text' },
    },
    decorators: [
        (Story): React.ReactElement => (
            <div style={{ display: 'flex', width: '300px', height: '100px', border: '1px solid #ccc' }}>
                <Story />
                <div style={{ flex: 1, backgroundColor: '#ddd', padding: 10 }}>Other Pane</div>
            </div>
        ),
    ],
} satisfies Meta<typeof SplitterPane>;

type Story = StoryObj<typeof meta>;


export const FixedSize: Story = {
    args: {
        size: '100px',
        isFlexible: false,
        children: <div style={{ backgroundColor: '#eee', height: '100%', padding: 10 }}>Fixed 100px</div>,
    },
};

export const Flexible: Story = {
    args: {
        isFlexible: true,
        children: <div style={{ backgroundColor: '#eee', height: '100%', padding: 10 }}>Flexible Pane</div>,
    },
};


export default meta;
