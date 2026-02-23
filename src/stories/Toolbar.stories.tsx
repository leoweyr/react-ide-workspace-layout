import type { Meta, StoryObj } from '@storybook/react';

import { Toolbar } from '../components/atoms/Toolbar';
import { Button } from '../components/atoms/Button';


const meta = {
    title: 'Atoms/Toolbar',
    component: Toolbar,
    tags: ['autodocs'],
    argTypes: {
        orientation: { control: 'select', options: ['horizontal', 'vertical'] },
        gap: { control: 'number' },
    },
} satisfies Meta<typeof Toolbar>;

type Story = StoryObj<typeof meta>;


export const Horizontal: Story = {
    args: {
        orientation: 'horizontal',
        children: (
            <>
                <Button icon="menu" variant="icon" />
                <Button icon="folder" variant="icon" />
                <Button icon="settings" variant="icon" />
            </>
        ),
    },
};

export const Vertical: Story = {
    args: {
        orientation: 'vertical',
        style: { height: '200px' },
        children: (
            <>
                <Button icon="menu" variant="icon" />
                <Button icon="folder" variant="icon" />
                <Button icon="settings" variant="icon" />
            </>
        ),
    },
};


export default meta;
