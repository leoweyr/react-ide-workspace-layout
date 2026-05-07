import { ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { 
    Icon, 
    Size, 
    JETBRAINS_ICONS
} from '../../components/style-atoms';


const meta = {
    title: 'Style Atoms/Icon',
    component: Icon,
    tags: ['autodocs'],
    argTypes: {
        name: { control: 'text' },
        svg: { control: 'text' },
        size: {
            control: 'select',
            options: [Size.SMALL, Size.MEDIUM, Size.LARGE],
        },
        color: { control: 'color' },
    },
} satisfies Meta<typeof Icon>;


type Story = StoryObj<typeof meta>;


/**
 * A gallery story that displays all available JetBrains icons in a grid.
 */
export const JetbrainsIconPresets: Story = {
    render: (args: any): ReactElement => (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: '20px',
            padding: '20px'
        }}>
            {Object.entries(JETBRAINS_ICONS).map(([key, icon]: [string, any]) => (
                <div key={key} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px',
                    border: '1px solid #3c3f41',
                    borderRadius: '4px',
                    backgroundColor: '#2b2b2b'
                }}>
                    <Icon 
                        {...args}
                        name={icon.props.name} 
                        svg={icon.props.svg} 
                    />
                    <span style={{ 
                        fontSize: '11px', 
                        color: '#afb1b3',
                        textAlign: 'center',
                        wordBreak: 'break-all'
                    }}>
                        {key}
                    </span>
                </div>
            ))}
        </div>
    ),
    args: {
        size: Size.MEDIUM,
        svg: '',
    }
};

export const ExternalLink: Story = {
    args: {
        name: 'external',
        svg: 'https://raw.githubusercontent.com/leoweyr/react-ide-workspace-layout/refs/heads/develop/assets/icon.svg',
        size: Size.LARGE
    },
};


export default meta;
