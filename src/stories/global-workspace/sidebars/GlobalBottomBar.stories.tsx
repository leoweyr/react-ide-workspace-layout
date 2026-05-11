import type { Meta, StoryObj } from '@storybook/react';

import { GlobalBottomBar } from '../../../components/global-workspace';
import { Breadcrumbs } from '../../../components/style-atoms';
import {
    IconWithTextButton,
    IconButton,
    TextButton, Tooltip
} from '../../../components/functional-atoms';
import { JETBRAINS_ICONS } from '../../../components/style-atoms';


const meta = {
    title: 'Global Workspace/Sidebars/GlobalBottomBar',
    component: GlobalBottomBar,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
    }
} satisfies Meta<typeof GlobalBottomBar>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        breadcrumbs: (
            <Breadcrumbs
                items={[
                    <IconWithTextButton key="projectName" text="react-ide-workspace-layout" icon={JETBRAINS_ICONS.Project} />,
                    <TextButton key="src" text="src" />,
                    <TextButton key="components" text="components" />,
                    <TextButton key="functionalAtoms" text="functional-atoms" />,
                    <IconWithTextButton key="Breadcrumbs" text="Breadcrumbs.jsx" icon={JETBRAINS_ICONS.FileJspx}/>,
                ]}
            />
        ),
        rightActions: [
            <TextButton key="line" text="6:6" tooltip={<Tooltip text="Go to Line" />} />,
            <TextButton key="lineSeparator" text="LF" tooltip={<Tooltip text="Line Separator: \n" />} />,
            <TextButton key="fileEncoding" text="UTF-8" tooltip={<Tooltip text="File Encoding: UTF-8" />} />,
            <IconWithTextButton key="indent" text="4 spaces" icon={JETBRAINS_ICONS.FileText} tooltip={<Tooltip text="Indent: 4 spaces" />} />,
            <IconButton key="fileReadOnly" icon={JETBRAINS_ICONS.Lock} />
        ]
    }
};

export const WithBreadcrumbs: Story = {
    args: {
        breadcrumbs: (
            <Breadcrumbs
                items={[
                    <IconWithTextButton key="projectName" text="react-ide-workspace-layout" icon={JETBRAINS_ICONS.Project} />,
                    <TextButton key="src" text="src" />,
                    <TextButton key="components" text="components" />,
                    <TextButton key="functionalAtoms" text="functional-atoms" />,
                    <IconWithTextButton key="Breadcrumbs" text="Breadcrumbs.jsx" icon={JETBRAINS_ICONS.FileJspx}/>,
                ]}
            />
        )
    }
};

export const WithRightActions: Story = {
    args: {
        rightActions: [
            <TextButton key="line" text="6:6" tooltip={<Tooltip text="Go to Line" />} />,
            <TextButton key="lineSeparator" text="LF" tooltip={<Tooltip text="Line Separator: \n" />} />,
            <TextButton key="fileEncoding" text="UTF-8" tooltip={<Tooltip text="File Encoding: UTF-8" />} />,
            <IconWithTextButton key="indent" text="4 spaces" icon={JETBRAINS_ICONS.FileText} tooltip={<Tooltip text="Indent: 4 spaces" />} />,
            <IconButton key="fileReadOnly" icon={JETBRAINS_ICONS.Lock} />
        ]
    }
};


export default meta;
