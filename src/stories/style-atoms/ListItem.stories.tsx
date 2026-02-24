import type { Meta, StoryObj } from '@storybook/react';

import ListItem from '../../components/style-atoms/ListItem';
import { IconName } from '../../components/style-atoms/enums/IconName';


const meta = {
    title: 'Style Atoms/ListItem',
    component: ListItem,
    tags: ['autodocs'],
    argTypes: {
        text: { control: 'text' },
        icon: { control: 'select', options: Object.values(IconName) },
        isSelected: { control: 'boolean' },
        depth: { control: 'number' },
    },
    decorators: [
        (Story): React.ReactElement => (
            <div style={{ width: '200px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof ListItem>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        id: '1',
        text: 'Item 1',
        isSelected: false,
        depth: 0,
    },
};

export const Selected: Story = {
    args: {
        id: '1',
        text: 'Item 1',
        isSelected: true,
        depth: 0,
    },
};

export const WithIcon: Story = {
    args: {
        id: '1',
        text: 'src',
        icon: IconName.FOLDER,
        isSelected: false,
        depth: 0,
    },
};

export const Nested: Story = {
    args: {
        id: '1',
        text: 'component.tsx',
        icon: IconName.FILE,
        isSelected: false,
        depth: 1,
    },
};

export const DeeplyNested: Story = {
    args: {
        id: '1',
        text: 'utils.ts',
        icon: IconName.FILE,
        isSelected: false,
        depth: 3,
    },
};


export default meta;
