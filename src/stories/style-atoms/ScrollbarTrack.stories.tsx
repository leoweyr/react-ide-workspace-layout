import type { Meta, StoryObj } from '@storybook/react';

import ScrollbarTrack from '../../components/style-atoms/ScrollbarTrack';
import ScrollbarThumb from '../../components/style-atoms/ScrollbarThumb';
import { SplitterOrientation } from '../../components/style-atoms/enums/SplitterOrientation';


const meta = {
    title: 'Style Atoms/ScrollbarTrack',
    component: ScrollbarTrack,
    tags: ['autodocs'],
    argTypes: {
        orientation: { control: 'radio', options: [SplitterOrientation.VERTICAL, SplitterOrientation.HORIZONTAL] },
    },
    decorators: [
        // eslint-disable-next-line @typescript-eslint/naming-convention
        (Story): React.ReactElement => (
            <div style={{ position: 'relative', width: '200px', height: '200px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof ScrollbarTrack>;

type Story = StoryObj<typeof meta>;


export const Vertical: Story = {
    args: {
        orientation: SplitterOrientation.VERTICAL,
    },
};

export const Horizontal: Story = {
    args: {
        orientation: SplitterOrientation.HORIZONTAL,
    },
};

export const WithThumb: Story = {
    args: {
        orientation: SplitterOrientation.VERTICAL,
        children: (
            <ScrollbarThumb
                orientation={SplitterOrientation.VERTICAL}
                positionPercent={10}
                sizePercent={30}
                isDragging={false}
                isHovered={false}
                onMouseDown={() => {}}
            />
        ),
    },
};

export default meta;
