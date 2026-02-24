import type { Meta, StoryObj } from '@storybook/react';

import SplitterDivider from '../../components/style-atoms/SplitterDivider';
import { SplitterOrientation } from '../../components/style-atoms/enums/SplitterOrientation';


const meta = {
    title: 'Style Atoms/SplitterDivider',
    component: SplitterDivider,
    tags: ['autodocs'],
    argTypes: {
        orientation: { control: 'radio', options: [SplitterOrientation.VERTICAL, SplitterOrientation.HORIZONTAL] },
    },
    decorators: [
        (Story): React.ReactElement => (
            <div style={{ display: 'flex', width: '200px', height: '200px', border: '1px solid #ccc', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ flex: 1, backgroundColor: '#eee' }}>Pane 1</div>
                <Story />
                <div style={{ flex: 1, backgroundColor: '#ddd' }}>Pane 2</div>
            </div>
        ),
    ],
} satisfies Meta<typeof SplitterDivider>;

type Story = StoryObj<typeof meta>;


export const Vertical: Story = {
    args: {
        orientation: SplitterOrientation.VERTICAL,
    },
    decorators: [
        (Story): React.ReactElement => (
            <div style={{ display: 'flex', flexDirection: 'row', width: '200px', height: '100px', border: '1px solid #ccc' }}>
                <div style={{ flex: 1, backgroundColor: '#eee', padding: 10 }}>Left</div>
                <Story />
                <div style={{ flex: 1, backgroundColor: '#ddd', padding: 10 }}>Right</div>
            </div>
        ),
    ],
};

export const Horizontal: Story = {
    args: {
        orientation: SplitterOrientation.HORIZONTAL,
    },
    decorators: [
        (Story): React.ReactElement => (
            <div style={{ display: 'flex', flexDirection: 'column', width: '100px', height: '200px', border: '1px solid #ccc' }}>
                <div style={{ flex: 1, backgroundColor: '#eee', padding: 10 }}>Top</div>
                <Story />
                <div style={{ flex: 1, backgroundColor: '#ddd', padding: 10 }}>Bottom</div>
            </div>
        ),
    ],
};


export default meta;
