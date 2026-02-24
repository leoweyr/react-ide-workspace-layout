import type { Meta, StoryObj } from '@storybook/react';

import ScrollbarThumb from '../../components/style-atoms/ScrollbarThumb';
import { SplitterOrientation } from '../../components/style-atoms/enums/SplitterOrientation';


const meta = {
    title: 'Style Atoms/ScrollbarThumb',
    component: ScrollbarThumb,
    tags: ['autodocs'],
    argTypes: {
        orientation: { control: 'radio', options: [SplitterOrientation.VERTICAL, SplitterOrientation.HORIZONTAL] },
        positionPercent: { control: { type: 'range', min: 0, max: 100 } },
        sizePercent: { control: { type: 'range', min: 0, max: 100 } },
        isDragging: { control: 'boolean' },
        isHovered: { control: 'boolean' },
    },
    decorators: [
        // eslint-disable-next-line @typescript-eslint/naming-convention
        (Story): React.ReactElement => (
            <div style={{ position: 'relative', width: '200px', height: '200px', border: '1px solid #ccc', backgroundColor: '#f0f0f0' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof ScrollbarThumb>;

type Story = StoryObj<typeof meta>;


export const Vertical: Story = {
    args: {
        orientation: SplitterOrientation.VERTICAL,
        positionPercent: 10,
        sizePercent: 20,
        isDragging: false,
        isHovered: false,
    },
};

export const Horizontal: Story = {
    args: {
        orientation: SplitterOrientation.HORIZONTAL,
        positionPercent: 10,
        sizePercent: 20,
        isDragging: false,
        isHovered: false,
    },
};

export const Hovered: Story = {
    args: {
        orientation: SplitterOrientation.VERTICAL,
        positionPercent: 10,
        sizePercent: 20,
        isDragging: false,
        isHovered: true,
    },
};

export const Dragging: Story = {
    args: {
        orientation: SplitterOrientation.VERTICAL,
        positionPercent: 10,
        sizePercent: 20,
        isDragging: true,
        isHovered: false,
    },
};


export default meta;
