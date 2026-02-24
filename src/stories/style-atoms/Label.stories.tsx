import type { Meta, StoryObj } from '@storybook/react';

import Label from '../../components/style-atoms/Label';
import { ComponentStyle } from '../../components/style-atoms/enums/ComponentStyle';
import { FontColor } from '../../components/style-atoms/enums/FontColor';
import Icon from '../../components/style-atoms/Icon';
import { IconName } from '../../components/style-atoms/enums/IconName';


const meta = {
    title: 'Atoms/Label',
    component: Label,
    tags: ['autodocs'],
    argTypes: {
        text: { control: 'text' },
        componentStyle: {
            control: 'select',
            options: [ComponentStyle.REGULAR, ComponentStyle.SMALL, ComponentStyle.LARGE],
        },
        fontColor: {
            control: 'select',
            options: [FontColor.NORMAL, FontColor.BRIGHT, FontColor.DIM, FontColor.ERROR],
        },
        disabled: { control: 'boolean' },
        copyable: { control: 'boolean' },
        html: { control: 'boolean' },
    },
} satisfies Meta<typeof Label>;

type Story = StoryObj<typeof meta>;


export const Primary: Story = {
    args: {
        text: 'Label Text',
        componentStyle: ComponentStyle.REGULAR,
        fontColor: FontColor.NORMAL,
    },
};

export const WithIcon: Story = {
    args: {
        text: 'Label with Icon',
        icon: <Icon name={IconName.FOLDER} />,
    },
};

export const SmallDim: Story = {
    args: {
        text: 'Small Dim Label',
        componentStyle: ComponentStyle.SMALL,
        fontColor: FontColor.DIM,
    },
};

export const LargeBright: Story = {
    args: {
        text: 'Large Bright Label',
        componentStyle: ComponentStyle.LARGE,
        fontColor: FontColor.BRIGHT,
        style: { background: '#555' },  // Background to see bright text.
    },
};

export const Error: Story = {
    args: {
        text: 'Error Label',
        fontColor: FontColor.ERROR,
    },
};

export const Copyable: Story = {
    args: {
        text: 'Select Me',
        copyable: true,
    },
};

export const HtmlContent: Story = {
    args: {
        text: '<b>Bold</b> <i>Italic</i>',
        html: true,
    },
};


export default meta;
