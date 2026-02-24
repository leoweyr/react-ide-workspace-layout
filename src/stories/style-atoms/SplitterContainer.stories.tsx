import type { Meta, StoryObj } from '@storybook/react';

import SplitterContainer from '../../components/style-atoms/SplitterContainer';
import SplitterPane from '../../components/style-atoms/SplitterPane';
import SplitterDivider from '../../components/style-atoms/SplitterDivider';
import { SplitterOrientation } from '../../components/style-atoms/enums/SplitterOrientation';


const meta = {
    title: 'Style Atoms/SplitterContainer',
    component: SplitterContainer,
    tags: ['autodocs'],
    argTypes: {
        orientation: { control: 'radio', options: [SplitterOrientation.VERTICAL, SplitterOrientation.HORIZONTAL] },
        isDragging: { control: 'boolean' },
    },
    decorators: [
        (Story): React.ReactElement => (
            <div style={{ width: '300px', height: '300px', border: '1px solid #ccc' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof SplitterContainer>;

type Story = StoryObj<typeof meta>;


export const VerticalLayout: Story = {
    args: {
        orientation: SplitterOrientation.VERTICAL,
        isDragging: false,
        children: (
            <>
                <SplitterPane size="30%" isFlexible={false}>
                    <div style={{ backgroundColor: '#eee', height: '100%', padding: 10 }}>Left</div>
                </SplitterPane>
                <SplitterDivider orientation={SplitterOrientation.VERTICAL} onMouseDown={() => {}} />
                <SplitterPane isFlexible={true}>
                    <div style={{ backgroundColor: '#ddd', height: '100%', padding: 10 }}>Right</div>
                </SplitterPane>
            </>
        ),
    },
};

export const HorizontalLayout: Story = {
    args: {
        orientation: SplitterOrientation.HORIZONTAL,
        isDragging: false,
        children: (
            <>
                <SplitterPane size="30%" isFlexible={false}>
                    <div style={{ backgroundColor: '#eee', height: '100%', padding: 10 }}>Top</div>
                </SplitterPane>
                <SplitterDivider orientation={SplitterOrientation.HORIZONTAL} onMouseDown={() => {}} />
                <SplitterPane isFlexible={true}>
                    <div style={{ backgroundColor: '#ddd', height: '100%', padding: 10 }}>Bottom</div>
                </SplitterPane>
            </>
        ),
    },
};


export default meta;
