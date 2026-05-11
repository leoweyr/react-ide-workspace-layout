import { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Tab } from '../../../components/functional-atoms';
import { Icon, JETBRAINS_ICONS } from '../../../components/style-atoms';


const meta = {
    title: 'Functional Atoms/Tab',
    component: Tab,
    tags: ['autodocs']
} satisfies Meta<typeof Tab>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        title: 'Tab.tsx',
        icon: JETBRAINS_ICONS.File as ReactElement<any, typeof Icon>
    }
};

export const Active: Story = {
    args: {
        title: 'Tab.tsx',
        icon: JETBRAINS_ICONS.File as ReactElement<any, typeof Icon>,
        isActive: true
    }
};

export const ActiveWithoutFocus: Story = {
    args: {
        title: 'Tab.tsx',
        icon: JETBRAINS_ICONS.File as ReactElement<any, typeof Icon>,
        isActive: true,
        isFocused: false
    }
};

export const Notification: Story = {
    args: {
        title: 'Tab.tsx',
        icon: JETBRAINS_ICONS.File as ReactElement<any, typeof Icon>,
        hasNotification: true
    }
};

export const Closable: Story = {
    args: {
        title: 'Tab.tsx',
        icon: JETBRAINS_ICONS.File as ReactElement<any, typeof Icon>,
        onClose: (): void => {}
    }
};


export default meta;
