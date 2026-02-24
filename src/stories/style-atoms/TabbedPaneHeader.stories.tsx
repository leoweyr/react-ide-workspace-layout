import type { Meta, StoryObj } from '@storybook/react';

import TabbedPaneHeader from '../../components/style-atoms/TabbedPaneHeader';
import Tab from '../../components/style-atoms/Tab';
import { IconName } from '../../components/style-atoms/enums/IconName';


const meta = {
    title: 'Style Atoms/TabbedPaneHeader',
    component: TabbedPaneHeader,
    tags: ['autodocs'],
    argTypes: {
        children: { control: 'text' },
    },
} satisfies Meta<typeof TabbedPaneHeader>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        children: (
            <>
                <Tab title="File1.ts" icon={IconName.FILE} isActive={true} isHovered={false} isCloseHovered={false} />
                <Tab title="File2.ts" icon={IconName.FILE} isActive={false} isHovered={false} isCloseHovered={false} />
                <Tab title="Settings" icon={IconName.SETTINGS} isActive={false} isHovered={false} isCloseHovered={false} />
            </>
        ),
    },
};


export default meta;
