import type { Meta, StoryObj } from '@storybook/react';

import Divider from '../../components/style-atoms/Divider';
import { Orientation } from '../../components/style-atoms';


const meta = {
    title: 'Style Atoms/Divider',
    component: Divider,
    argTypes: {
        orientation: {
            control: 'select',
            options: Object.values(Orientation)
        },
        thickness: { control: 'number' },
        length: { control: 'text' },
        color: { control: 'color' }
    },
    tags: ['autodocs']
} satisfies Meta<typeof Divider>;

type Story = StoryObj<typeof meta>;


export const Horizontal: Story = {
    args: {
        orientation: Orientation.HORIZONTAL,
    },
};

export const Vertical: Story = {
    args: {
        orientation: Orientation.VERTICAL,
        length: '100px',
    }
};


export default meta;
