import { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
    Workspace,
    GlobalTopBar,
    GlobalSideBar,
    GlobalBottomBar
} from '../../components/global-workspace';
import {
    Icon,
    JETBRAINS_ICONS,
    Size,
    Breadcrumbs
} from '../../components/style-atoms';
import {
    IconButton,
    TextButton,
    IconWithTextButton,
    DropDownMenuButton,
    Tooltip,
    TooltipPosition
} from '../../components/functional-atoms';
import logo from '../../../assets/icon.svg';


const meta = {
    title: 'Global Workspace/Workspace',
    component: Workspace,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story): ReactElement => (
            <div style={{ width: '100vw', height: '100vh' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Workspace>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        topBar: (
            <GlobalTopBar
                logo={<Icon name="Logo" svg={logo} size={Size.MEDIUM} />}
                menuItems={[
                    <TextButton key="file" text="File" />,
                    <TextButton key="edit" text="Edit" />,
                    <TextButton key="view" text="View" />,
                    <TextButton key="navigate" text="Navigate" />,
                    <TextButton key="code" text="Code" />,
                    <TextButton key="refactor" text="Refactor" />,
                    <TextButton key="run" text="Run" />,
                    <TextButton key="tools" text="Tools" />,
                    <TextButton key="git" text="Git" />,
                    <TextButton key="window" text="Window" />,
                    <TextButton key="help" text="Help" />,
                ]}
                leftActions={[
                    <DropDownMenuButton
                        key="project"
                        icon={JETBRAINS_ICONS.Project}
                        text={"Main Project"}
                        tooltip={<Tooltip text="Main Project" />}
                    />
                ]}
                rightActions={[
                    <IconButton
                        key="search"
                        icon={JETBRAINS_ICONS.Search}
                        tooltip={<Tooltip text="Search" />}
                    />,
                    <IconButton
                        key="settings"
                        icon={JETBRAINS_ICONS.Settings}
                        tooltip={<Tooltip text="Settings" />}
                    />
                ]}
            />
        ),
        leftBar: (
            <GlobalSideBar
                topActions={[
                    <IconButton key="project" icon={JETBRAINS_ICONS.Folder} tooltip={<Tooltip text="Project" position={TooltipPosition.RIGHT} />} />,
                    <IconButton key="commit" icon={JETBRAINS_ICONS.Commit} tooltip={<Tooltip text="Commit" position={TooltipPosition.RIGHT} />} />,
                    <IconButton key="pull-requests" icon={JETBRAINS_ICONS.PrOpen} tooltip={<Tooltip text="Pull Requests" position={TooltipPosition.RIGHT} />} />
                ]}
                bottomActions={[
                    <IconButton key="run" icon={JETBRAINS_ICONS.Play} tooltip={<Tooltip text="Run" position={TooltipPosition.RIGHT} />} />,
                    <IconButton key="terminal" icon={JETBRAINS_ICONS.Terminal} tooltip={<Tooltip text="Terminal" position={TooltipPosition.RIGHT} />} />,
                    <IconButton key="problems" icon={JETBRAINS_ICONS.ExceptionEmpty} tooltip={<Tooltip text="Problems" position={TooltipPosition.RIGHT} />} />,
                    <IconButton key="git" icon={JETBRAINS_ICONS.Git} tooltip={<Tooltip text="Git" position={TooltipPosition.RIGHT} />} />
                ]}
            />
        ),
        rightBar: (
            <GlobalSideBar
                topActions={[
                    <IconButton key="notifications" icon={JETBRAINS_ICONS.Bell} tooltip={<Tooltip text="Notifications" position={TooltipPosition.LEFT} />} />,
                    <IconButton key="ai-chat" icon={JETBRAINS_ICONS.GalaxyChat} tooltip={<Tooltip text="AI Chat" position={TooltipPosition.LEFT} />} />
                ]}
            />
        ),
        bottomBar: (
            <GlobalBottomBar
                breadcrumbs={
                    <Breadcrumbs
                        items={[
                            <IconWithTextButton key="projectName" text="react-ide-workspace-layout" icon={JETBRAINS_ICONS.Project} />,
                            <TextButton key="src" text="src" />,
                            <TextButton key="components" text="components" />,
                            <TextButton key="functionalAtoms" text="functional-atoms" />,
                            <IconWithTextButton key="Breadcrumbs" text="Breadcrumbs.jsx" icon={JETBRAINS_ICONS.FileJspx}/>,
                        ]}
                    />
                }
                rightActions={[
                    <TextButton key="line" text="6:6" tooltip={<Tooltip text="Go to Line" />} />,
                    <TextButton key="lineSeparator" text="LF" tooltip={<Tooltip text="Line Separator: \n" />} />,
                    <TextButton key="fileEncoding" text="UTF-8" tooltip={<Tooltip text="File Encoding: UTF-8" />} />,
                    <IconWithTextButton key="indent" text="4 spaces" icon={JETBRAINS_ICONS.FileText} tooltip={<Tooltip text="Indent: 4 spaces" />} />,
                    <IconButton key="fileReadOnly" icon={JETBRAINS_ICONS.Lock} />
                ]}
            />
        ),
        children: (
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                fontSize: '24px'
            }}>
                Content Area
            </div>
        )
    }
};

export const CrossComponentDrag: Story = {
    args: {
        ...Default.args,
        leftBar: (
            <GlobalSideBar
                topActionsGroupId="left-sidebar-top"
                bottomActionsGroupId="left-sidebar-bottom"
                topActions={[
                    <IconButton key="project" icon={JETBRAINS_ICONS.Folder} tooltip={<Tooltip text="Project" position={TooltipPosition.RIGHT} />} />,
                    <IconButton key="commit" icon={JETBRAINS_ICONS.Commit} tooltip={<Tooltip text="Commit" position={TooltipPosition.RIGHT} />} />,
                    <IconButton key="pull-requests" icon={JETBRAINS_ICONS.PrOpen} tooltip={<Tooltip text="Pull Requests" position={TooltipPosition.RIGHT} />} />
                ]}
                bottomActions={[
                    <IconButton key="run" icon={JETBRAINS_ICONS.Play} tooltip={<Tooltip text="Run" position={TooltipPosition.RIGHT} />} />,
                    <IconButton key="terminal" icon={JETBRAINS_ICONS.Terminal} tooltip={<Tooltip text="Terminal" position={TooltipPosition.RIGHT} />} />,
                    <IconButton key="problems" icon={JETBRAINS_ICONS.ExceptionEmpty} tooltip={<Tooltip text="Problems" position={TooltipPosition.RIGHT} />} />,
                    <IconButton key="git" icon={JETBRAINS_ICONS.Git} tooltip={<Tooltip text="Git" position={TooltipPosition.RIGHT} />} />
                ]}
            />
        ),
        rightBar: (
            <GlobalSideBar
                topActionsGroupId="right-sidebar-top"
                bottomActionsGroupId="right-sidebar-bottom"
                topActions={[
                    <IconButton key="notifications" icon={JETBRAINS_ICONS.Bell} tooltip={<Tooltip text="Notifications" position={TooltipPosition.LEFT} />} />,
                    <IconButton key="ai-chat" icon={JETBRAINS_ICONS.GalaxyChat} tooltip={<Tooltip text="AI Chat" position={TooltipPosition.LEFT} />} />
                ]}
            />
        ),
    }
};


export default meta;
