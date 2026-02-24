import type { Meta, StoryObj } from '@storybook/react';

import List from '../../components/style-atoms/List';
import ListItem from '../../components/style-atoms/ListItem';
import { IconName } from '../../components/style-atoms/enums/IconName';


const meta = {
    title: 'Style Atoms/List',
    component: List,
    tags: ['autodocs'],
    argTypes: {
        children: { control: 'text' },
    },
} satisfies Meta<typeof List>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        children: (
            <>
                <ListItem id="1" text="Item 1" />
                <ListItem id="2" text="Item 2" />
                <ListItem id="3" text="Item 3" />
            </>
        ),
        style: { width: '200px', border: '1px solid #ccc' },
    },
};

export const WithIcons: Story = {
    args: {
        children: (
            <>
                <ListItem id="1" text="File 1.ts" icon={IconName.FILE} />
                <ListItem id="2" text="File 2.ts" icon={IconName.FILE} />
                <ListItem id="3" text="Settings" icon={IconName.SETTINGS} />
            </>
        ),
        style: { width: '200px', border: '1px solid #ccc' },
    },
};


export default meta;
