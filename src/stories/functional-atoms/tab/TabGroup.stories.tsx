import type { Meta, StoryObj } from '@storybook/react';
import { ReactElement } from 'react';

import { TabGroup, Tab } from '../../../components/functional-atoms/tab';
import { JETBRAINS_ICONS, Icon } from '../../../components/style-atoms';


const meta = {
    title: 'Functional Atoms/Tab/TabGroup',
    component: TabGroup,
    tags: ['autodocs'],
    argTypes: {
        isFocused: { control: 'boolean' },
    },
} satisfies Meta<typeof TabGroup>;

type Story = StoryObj<typeof meta>;

const createTabs = (): Map<string, ReactElement<any, typeof Tab>> => {
    const tabs = new Map<string, ReactElement<any, typeof Tab>>();

    tabs.set('1', <Tab title="README.md" icon={JETBRAINS_ICONS.File as ReactElement<any, typeof Icon>} />);
    tabs.set('2', <Tab title="index.ts" icon={JETBRAINS_ICONS.File as ReactElement<any, typeof Icon>} />);
    tabs.set('3', <Tab title="TabGroup.jsx" icon={JETBRAINS_ICONS.File as ReactElement<any, typeof Icon>} />);

    return tabs;
};


export const Default: Story = {
    args: {
        tabs: createTabs(),
        isFocused: true,
    },
};

export const Unfocused: Story = {
    args: {
        tabs: createTabs(),
        isFocused: false,
    },
};


export default meta;
