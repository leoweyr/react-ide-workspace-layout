import type { Meta, StoryObj } from '@storybook/react';

import ScrollPaneContent from '../../components/style-atoms/ScrollPaneContent';


const meta = {
    title: 'Style Atoms/ScrollPaneContent',
    component: ScrollPaneContent,
    tags: ['autodocs'],
    argTypes: {
        children: { control: 'text' },
    },
    decorators: [
        (Story): React.ReactElement => (
            <div style={{ width: '200px', height: '200px', border: '1px solid #ccc', position: 'relative', overflow: 'hidden' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof ScrollPaneContent>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        children: <div style={{ padding: 20 }}>Content</div>,
    },
};

export const LargeContent: Story = {
    args: {
        children: (
            <div style={{ width: '400px', height: '400px', background: 'linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee), linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px', backgroundColor: '#fff' }}>
                Large Content (400x400)
            </div>
        ),
    },
};


export default meta;
