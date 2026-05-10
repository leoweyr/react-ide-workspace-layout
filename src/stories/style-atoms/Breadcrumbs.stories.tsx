import type { Meta, StoryObj } from '@storybook/react';

import { Breadcrumbs, IconWithTextButton, TextButton } from '../../components/functional-atoms';
import {JETBRAINS_ICONS, Size} from '../../components/style-atoms';


const meta = {
    title: 'Functional Atoms/Breadcrumbs',
    component: Breadcrumbs,
    tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        items: [
            <IconWithTextButton key="projectName" text="react-ide-workspace-layout" icon={JETBRAINS_ICONS.Project} />,
            <TextButton key="src" text="src" />,
            <TextButton key="components" text="components" />,
            <TextButton key="functionalAtoms" text="functional-atoms" />,
            <IconWithTextButton key="Breadcrumbs" text="Breadcrumbs.jsx" icon={JETBRAINS_ICONS.FileJspx}/>,
        ]
    }
};

export const Small: Story = {
    args: {
        items: [
            <IconWithTextButton key="projectName" text="react-ide-workspace-layout" icon={JETBRAINS_ICONS.Project} />,
            <TextButton key="src" text="src" />,
            <TextButton key="components" text="components" />,
            <TextButton key="functionalAtoms" text="functional-atoms" />,
            <IconWithTextButton key="Breadcrumbs" text="Breadcrumbs.jsx" icon={JETBRAINS_ICONS.FileJspx}/>,
        ],
        size: Size.SMALL
    }
};


export default meta;
