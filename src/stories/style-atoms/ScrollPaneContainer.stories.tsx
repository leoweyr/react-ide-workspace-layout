import type { Meta, StoryObj } from '@storybook/react';

import ScrollPaneContainer from '../../components/style-atoms/ScrollPaneContainer';


const meta = {
    title: 'Style Atoms/ScrollPaneContainer',
    component: ScrollPaneContainer,
    tags: ['autodocs'],
    argTypes: {
        children: { control: 'text' },
    },
    decorators: [
        (Story): React.ReactElement => (
            <div style={{ width: '200px', height: '200px', border: '1px solid #ccc' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof ScrollPaneContainer>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        style: { width: '100%', height: '100%' },
        children: <div style={{ padding: 20 }}>Container Content</div>,
    },
};


export default meta;
