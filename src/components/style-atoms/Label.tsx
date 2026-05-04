import { Component, ReactNode, CSSProperties } from 'react';

import { Theme } from '../../features/theme/Theme';
import { ComponentStyle } from './enums/ComponentStyle';
import { FontColor } from './enums/FontColor';


interface LabelProps {
    text: string;
    icon?: ReactNode;
    componentStyle?: ComponentStyle;
    fontColor?: FontColor;
    disabled?: boolean;
    copyable?: boolean;
    html?: boolean;
    className?: string;
    style?: CSSProperties;
    title?: string;
    anchor?: string;  // ID of the element to focus/activate.
}


interface LabelState {}


class Label extends Component<LabelProps, LabelState> {
    public static defaultProps = {
        componentStyle: ComponentStyle.REGULAR,
        fontColor: FontColor.NORMAL,
        disabled: false,
        copyable: false,
        html: false,
    };

    public render(): ReactNode {
        const { text, icon, html, className, title } = this.props;

        return (
            <div
                className={className}
                style={this.getContainerStyles()}
                title={title}
                onClick={this.handleAnchorClick}
            >
                {icon && <span style={this.getIconStyles()}>{icon}</span>}
                {html ? (
                    <span
                        style={this.getTextStyles()}
                        dangerouslySetInnerHTML={{ __html: text }}
                    />
                ) : (
                    <span style={this.getTextStyles()}>{text}</span>
                )}
            </div>
        );
    }

    private handleAnchorClick: () => void = (): void => {
        const { anchor } = this.props;
        if (anchor) {
            const element = document.getElementById(anchor);
            if (element) {
                element.focus();
                element.click();
            }
        }
    };

    private getContainerStyles(): CSSProperties {
        const { style } = this.props;

        return {
            display: 'inline-flex',
            alignItems: 'center',
            verticalAlign: 'middle',
            maxWidth: '100%',
            ...style,
        };
    }

    private getIconStyles(): CSSProperties {
        const theme = Theme.getInstance();

        return {
            marginRight: theme.layout.spacing.extraSmall,
            display: 'flex',
            alignItems: 'center',
        };
    }

    private getTextStyles(): CSSProperties {
        const { copyable } = this.props;
        const theme = Theme.getInstance();

        return {
            color: this.getColor(),
            fontSize: this.getFontSize(),
            fontFamily: theme.typography.font.family,
            lineHeight: theme.typography.line.height,
            userSelect: copyable ? 'text' : 'none',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            cursor: 'default',
        };
    }

    private getColor(): string {
        const { fontColor, disabled } = this.props;
        const theme = Theme.getInstance();

        if (disabled) {
            return theme.colors.neutral.textSecondary;  // Disabled usually looks like secondary/dim.
        }

        switch (fontColor) {
            case FontColor.BRIGHT:
                return '#ffffff';  // TODO: Add to Theme.
            case FontColor.DIM:
                return theme.colors.neutral.textSecondary;
            case FontColor.ERROR:
                return theme.colors.status.error;
            case FontColor.NORMAL:
            default:
                return theme.colors.neutral.text;
        }
    }

    private getFontSize(): string {
        const { componentStyle } = this.props;
        const theme = Theme.getInstance();

        switch (componentStyle) {
            case ComponentStyle.SMALL:
                return theme.typography.font.sizeSmall;
            case ComponentStyle.LARGE:
                return theme.typography.font.sizeLarge;
            case ComponentStyle.REGULAR:
            default:
                return theme.typography.font.size;
        }
    }
}


export default Label;
