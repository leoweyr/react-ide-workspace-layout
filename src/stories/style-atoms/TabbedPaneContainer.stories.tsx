import type { Meta, StoryObj } from '@storybook/react';

import TabbedPaneContainer from '../../components/style-atoms/TabbedPaneContainer';


const meta = {
    title: 'Style Atoms/TabbedPaneContainer',
    component: TabbedPaneContainer,
    tags: ['autodocs'],
    argTypes: {
        children: { control: 'text' },
    },
    decorators: [
        (Story): React.ReactElement => (
            <div style={{ width: '300px', height: '200px', border: '1px solid #ccc' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof TabbedPaneContainer>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        children: (
            <>
                <div style={{ height: '30px', backgroundColor: '#eee', borderBottom: '1px solid #ccc' }}>Header</div>
                <div style={{ flex: 1, padding: '10px' }}>Content</div>
            </>
        ),
    },
};


export default meta;
