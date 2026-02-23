import { Component, CSSProperties, ReactNode } from 'react';

import { Theme } from '../../theme/Theme';


export interface ProgressBarProps {
    value: number;
    max?: number;
    showLabel?: boolean;
    indeterminate?: boolean;
    className?: string;
    style?: CSSProperties;
}


export class ProgressBar extends Component<ProgressBarProps> {
    public render(): ReactNode {
        const { className, showLabel, value, max = 100 } = this.props;
        const percentage: number = Math.min(100, Math.max(0, (value / max) * 100));

        return (
            <div className={className} style={this.getContainerStyles()}>
                <div style={this.getBarStyles(percentage)} />
                {showLabel && <span style={this.getLabelStyles()}>{Math.round(percentage)}%</span>}
            </div>
        );
    }

    private getContainerStyles(): CSSProperties {
        const theme = Theme.getInstance();

        return {
            width: '100%',
            height: '14px',
            backgroundColor: theme.colors.progressBarBackground,
            borderRadius: '2px',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...this.props.style,
        };
    }

    private getBarStyles(percentage: number): CSSProperties {
        const theme = Theme.getInstance();

        return {
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: theme.colors.progressBarForeground,
            transition: 'width 0.2s ease-in-out',
            position: 'absolute',
            left: 0,
            top: 0,
        };
    }

    private getLabelStyles(): CSSProperties {
        const theme = Theme.getInstance();
        return {
            color: theme.colors.text,
            fontSize: '10px',
            lineHeight: '1',
            zIndex: 1,
            position: 'absolute',
            mixBlendMode: 'difference',
            textShadow: '0 0 2px rgba(0,0,0,0.5)',
        };
    }
}


export default ProgressBar;
