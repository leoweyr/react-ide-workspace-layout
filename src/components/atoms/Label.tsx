import React, { Component, ReactNode, CSSProperties } from 'react';

import { Theme } from '../../theme/Theme';
import { ComponentStyle } from './enums/ComponentStyle';
import { FontColor } from './enums/FontColor';


export interface LabelProps {
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
    anchor?: string; // ID of the element to focus/activate.
}


export interface LabelState {}


export class Label extends Component<LabelProps, LabelState> {
    public static defaultProps = {
        componentStyle: ComponentStyle.REGULAR,
        fontColor: FontColor.NORMAL,
        disabled: false,
        copyable: false,
        html: false,
    };

    public render(): ReactNode {
        const { text, icon, html, className, title, anchor } = this.props;

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
            marginRight: theme.spacing.xs,
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
            fontFamily: theme.typography.fontFamily,
            lineHeight: theme.typography.lineHeight,
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
            return theme.colors.textSecondary; // Disabled usually looks like secondary/dim.
        }

        switch (fontColor) {
            case FontColor.BRIGHT:
                return '#ffffff'; // TODO: Add to Theme.
            case FontColor.DIM:
                return theme.colors.textSecondary;
            case FontColor.ERROR:
                return theme.colors.error;
            case FontColor.NORMAL:
            default:
                return theme.colors.text;
        }
    }

    private getFontSize(): string {
        const { componentStyle } = this.props;
        const theme = Theme.getInstance();

        switch (componentStyle) {
            case ComponentStyle.SMALL:
                return theme.typography.fontSizeSmall;
            case ComponentStyle.LARGE:
                return theme.typography.fontSizeLarge;
            case ComponentStyle.REGULAR:
            default:
                return theme.typography.fontSize;
        }
    }
}


export default Label;
