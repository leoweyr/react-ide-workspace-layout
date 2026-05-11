import { ReactElement } from 'react';
import type { Meta, StoryObj, StoryFn } from '@storybook/react';

import { GlobalSideBar } from '../../../components/global-workspace';
import { JETBRAINS_ICONS } from '../../../components/style-atoms';
import { IconButton, Tooltip, TooltipPosition } from '../../../components/functional-atoms';


const meta = {
    title: 'Global Workspace/Sidebars/GlobalSideBar',
    component: GlobalSideBar,
    tags: ['autodocs'],
} satisfies Meta<typeof GlobalSideBar>;

type Story = StoryObj<typeof meta>;


export const LeftSide: Story = {
    decorators: [
        (Story: StoryFn): ReactElement => (
            <div style={{ height: '400px', display: 'flex' }}>
                <Story />
                <div style={{ flex: 1, background: '#1e1e1e' }} />
            </div>
        ),
    ],
    args: {
        topActions: [
            <IconButton key="project" icon={JETBRAINS_ICONS.Folder} tooltip={<Tooltip text="Project" position={TooltipPosition.RIGHT} />} />,
            <IconButton key="commit" icon={JETBRAINS_ICONS.Commit} tooltip={<Tooltip text="Commit" position={TooltipPosition.RIGHT} />} />,
            <IconButton key="pull-requests" icon={JETBRAINS_ICONS.PrOpen} tooltip={<Tooltip text="Pull Requests" position={TooltipPosition.RIGHT} />} />
        ],
        bottomActions: [
            <IconButton key="run" icon={JETBRAINS_ICONS.Play} tooltip={<Tooltip text="Run" position={TooltipPosition.RIGHT} />} />,
            <IconButton key="terminal" icon={JETBRAINS_ICONS.Terminal} tooltip={<Tooltip text="Terminal" position={TooltipPosition.RIGHT} />} />,
            <IconButton key="problems" icon={JETBRAINS_ICONS.ExceptionEmpty} tooltip={<Tooltip text="Problems" position={TooltipPosition.RIGHT} />} />,
            <IconButton key="git" icon={JETBRAINS_ICONS.Git} tooltip={<Tooltip text="Git" position={TooltipPosition.RIGHT} />} />
        ],
    },
};

export const RightSide: Story = {
    decorators: [
        (Story: StoryFn): ReactElement => (
            <div style={{ height: '400px', display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ flex: 1, background: '#1e1e1e' }} />
                <Story />
            </div>
        ),
    ],
    args: {
        topActions: [
            <IconButton key="notifications" icon={JETBRAINS_ICONS.Bell} tooltip={<Tooltip text="Notifications" position={TooltipPosition.LEFT} />} />,
            <IconButton key="ai-chat" icon={JETBRAINS_ICONS.GalaxyChat} tooltip={<Tooltip text="AI Chat" position={TooltipPosition.LEFT} />} />
        ],
    },
};


export default meta;
