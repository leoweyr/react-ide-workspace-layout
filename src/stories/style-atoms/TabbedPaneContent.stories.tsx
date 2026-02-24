import type { Meta, StoryObj } from '@storybook/react';

import TabbedPaneContent from '../../components/style-atoms/TabbedPaneContent';


const meta = {
    title: 'Style Atoms/TabbedPaneContent',
    component: TabbedPaneContent,
    tags: ['autodocs'],
    argTypes: {
        children: { control: 'text' },
    },
    decorators: [
        (Story): React.ReactElement => (
            <div style={{ width: '300px', height: '200px', border: '1px solid #ccc', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '30px', borderBottom: '1px solid #ccc' }}>Header Placeholder</div>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof TabbedPaneContent>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        children: <div style={{ padding: 20 }}>Pane Content</div>,
    },
};


export default meta;
