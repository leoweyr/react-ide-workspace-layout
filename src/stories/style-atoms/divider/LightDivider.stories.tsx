import { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import LightDivider from '../../../components/style-atoms/divider/LightDivider';


const meta = {
    title: 'Style Atoms/Divider/LightDivider',
    component: LightDivider,
    tags: ['autodocs'],
} satisfies Meta<typeof LightDivider>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    render: (): ReactElement => (
        <div style={{ width: '300px', padding: '10px', background: '#ffffff' }}>
            <div style={{ padding: '4px 0' }}>Sub Item Top</div>
            <LightDivider />
            <div style={{ padding: '4px 0' }}>Sub Item Bottom</div>
        </div>
    )
};


export default meta;
