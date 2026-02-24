import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from '../../theme/Theme';
import Panel from '../../components/style-atoms/Panel';


const theme = Theme.getInstance();

const meta = {
    title: 'Atoms/Panel',
    component: Panel,
    tags: ['autodocs'],
    argTypes: {
        padding: { control: 'text' },
        backgroundColor: { control: 'color' },
        width: { control: 'text' },
        height: { control: 'text' },
    },
} satisfies Meta<typeof Panel>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        children: 'Panel Content',
        style: { color: theme.colors.text },
    },
};

export const CustomPadding: Story = {
    args: {
        children: 'Custom Padding (20px)',
        padding: '20px',
        style: { color: theme.colors.text, border: '1px solid #666' },
    },
};

export const DarkerBackground: Story = {
    args: {
        children: 'Darker Background',
        backgroundColor: theme.colors.editorBackground,
        padding: '20px',
        style: { color: theme.colors.text },
    },
};


export default meta;
