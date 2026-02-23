import { CSSProperties, MouseEvent, Component, ReactNode } from 'react';

import { IconName } from './enums/IconName';
import { Theme } from '../../theme/Theme';


export interface IconProps {
    name: IconName;
    size?: number;
    color?: string;
    className?: string;
    style?: CSSProperties;
    onClick?: (event: MouseEvent) => void;
}


export class Icon extends Component<IconProps> {
    public render(): ReactNode {
        const { className, onClick } = this.props;

        return (
            <svg
                className={className}
                style={this.getStyles()}
                viewBox="0 0 24 24"
                onClick={onClick}
            >
                {this.renderIconPath()}
            </svg>
        );
    }

    private getStyles(): CSSProperties {
        const theme = Theme.getInstance();
        const { size = 16, color, style } = this.props;

        return {
            width: size,
            height: size,
            fill: color ?? theme.colors.text,
            display: 'inline-block',
            verticalAlign: 'middle',
            cursor: this.props.onClick ? 'pointer' : 'default',
            ...style,
        };
    }

    private renderIconPath(): ReactNode {
        switch (this.props.name) {
            case IconName.CLOSE:
                return <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />;
            case IconName.EXPAND:
                return <path d="M16.59,8.59L12,13.17L7.41,8.59L6,10L12,16L18,10L16.59,8.59Z" />;
            case IconName.COLLAPSE:
                return <path d="M12,8L6,14L7.41,15.41L12,10.83L16.59,15.41L18,14L12,8Z" />;
            case IconName.FOLDER:
                return <path d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,4H12L10,4Z" />;
            case IconName.FILE:
                return <path d="M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M15,18V16H6V18H15M18,14V12H6V14H18Z" />;
            case IconName.SEARCH:
                return <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />;
            case IconName.SETTINGS:
                return <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.35 19.43,11.03L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11.03C4.53,11.35 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.04 4.95,18.95L7.44,17.95C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.95L19.05,18.95C19.27,19.04 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />;
            case IconName.MENU:
                return <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />;
            default:
                return null;
        }
    }
}
