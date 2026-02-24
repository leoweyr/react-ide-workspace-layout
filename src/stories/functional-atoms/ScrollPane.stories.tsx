import type { Meta, StoryObj } from '@storybook/react';
import { ReactElement } from 'react';

import ScrollPane from '../../components/functional-atoms/ScrollPane';


const meta = {
    title: 'Atoms/ScrollPane',
    component: ScrollPane,
    tags: ['autodocs'],
    decorators: [
        (Story): ReactElement => (
            <div style={{ width: '300px', height: '200px', border: '1px solid #ccc' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof ScrollPane>;

type Story = StoryObj<typeof meta>;


export const Vertical: Story = {
    args: {
        children: (
            <div style={{ padding: '20px' }}>
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
                        Item {i + 1}
                    </div>
                ))}
            </div>
        ),
    },
};

export const Horizontal: Story = {
    args: {
        children: (
            <div style={{ width: '600px', padding: '20px', background: 'linear-gradient(90deg, #f0f0f0, #ccc)' }}>
                Wide Content (600px)
            </div>
        ),
    },
};

export const Both: Story = {
    args: {
        children: (
            <div style={{ width: '600px', padding: '20px' }}>
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
                        Wide Item {i + 1} with a lot of text to make it wide
                    </div>
                ))}
            </div>
        ),
    },
};


export default meta;
