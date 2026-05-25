import { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import HeavyDivider from '../../../components/style-atoms/divider/HeavyDivider';


const meta = {
    title: 'Style Atoms/Divider/HeavyDivider',
    component: HeavyDivider,
    tags: ['autodocs'],
} satisfies Meta<typeof HeavyDivider>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    render: (): ReactElement => (
        <div style={{ width: '300px', padding: '10px', background: '#ffffff' }}>
            <div style={{ padding: '8px' }}>Section Top</div>
            <HeavyDivider />
            <div style={{ padding: '8px' }}>Section Bottom</div>
        </div>
    )
};


export default meta;
