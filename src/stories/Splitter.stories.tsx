import type { Meta, StoryObj } from '@storybook/react';

import { Splitter } from '../components/atoms/Splitter';
import { SplitterOrientation } from '../components/atoms/enums/SplitterOrientation';
import { Panel } from '../components/atoms/Panel';


const meta = {
    title: 'Atoms/Splitter',
    component: Splitter,
    tags: ['autodocs'],
    argTypes: {
        orientation: { 
            control: 'select', 
            options: [SplitterOrientation.VERTICAL, SplitterOrientation.HORIZONTAL] 
        },
        proportion: { control: { type: 'range', min: 0.1, max: 0.9, step: 0.05 } },
    },
    decorators: [
        (Story) => (
            <div style={{ width: '100%', height: '400px', border: '1px solid #ccc' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Splitter>;

type Story = StoryObj<typeof meta>;

const FirstComponent = () => (
    <Panel backgroundColor="#2b2b2b" style={{ height: '100%', width: '100%' }}>
        <div style={{ color: '#aaa', padding: '10px' }}>First Component</div>
    </Panel>
);

const SecondComponent = () => (
    <Panel backgroundColor="#3c3f41" style={{ height: '100%', width: '100%' }}>
        <div style={{ color: '#aaa', padding: '10px' }}>Second Component</div>
    </Panel>
);


export const Vertical: Story = {
    args: {
        orientation: SplitterOrientation.VERTICAL,
        firstComponent: <FirstComponent />,
        secondComponent: <SecondComponent />,
        proportion: 0.3,
    },
};

export const Horizontal: Story = {
    args: {
        orientation: SplitterOrientation.HORIZONTAL,
        firstComponent: <FirstComponent />,
        secondComponent: <SecondComponent />,
        proportion: 0.5,
    },
};


export default meta;
