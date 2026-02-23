import { MouseEvent, CSSProperties, Component, ReactNode } from 'react';

import { IconName } from './enums/IconName';
import { ButtonVariant } from './enums/ButtonVariant';
import { ButtonSize } from './enums/ButtonSize';
import { Theme } from '../../theme/Theme';
import { Icon } from './Icon';


export interface ButtonProps {
    text?: string;
    icon?: IconName;
    variant?: ButtonVariant;
    size?: ButtonSize;
    onClick?: (event: MouseEvent) => void;
    disabled?: boolean;
    active?: boolean;
    tooltip?: string;
    className?: string;
    style?: CSSProperties;
}


export interface ButtonState {
    isHovered: boolean;
}


export class Button extends Component<ButtonProps, ButtonState> {
    private handleMouseEnter: () => void = (): void => {
        if (!this.props.disabled) {
            this.setState({ isHovered: true });
        }
    };

    private handleMouseLeave: () => void = (): void => {
        this.setState({ isHovered: false });
    };

    constructor(props: ButtonProps) {
        super(props);

        this.state = {
            isHovered: false,
        };
    }

    public render(): ReactNode {
        const { text, icon, onClick, tooltip, className, size = ButtonSize.MEDIUM } = this.props;
        const iconSize: number = size === ButtonSize.SMALL ? 14 : (size === ButtonSize.MEDIUM ? 16 : 20);

        return (
            <button
                className={className}
                style={this.getStyles()}
                onClick={onClick}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                title={tooltip}
            >
                {icon && <Icon name={icon} size={iconSize} color="currentColor" />}
                {text && <span>{text}</span>}
            </button>
        );
    }

    private getStyles(): CSSProperties {
        const theme = Theme.getInstance();
        const { variant = ButtonVariant.DEFAULT, size = ButtonSize.MEDIUM, disabled, active, style } = this.props;
        const { isHovered } = this.state;

        let bg: string = 'transparent';
        let color: string = theme.colors.text;
        let border: string = '1px solid transparent';
        let padding: string = '0';
        const borderRadius: string = '3px';
        let opacity: number = 1;
        let cursor: string = 'pointer';

        // This section handles size logic.
        const paddingX: number = size === ButtonSize.SMALL ? theme.spacing.sm : (size === ButtonSize.MEDIUM ? theme.spacing.md : theme.spacing.lg);
        const paddingY: number = size === ButtonSize.SMALL ? 2 : (size === ButtonSize.MEDIUM ? 4 : 6);
        const fontSize: string = theme.typography.fontSize;

        // This section handles variant logic.
        switch (variant) {
            case ButtonVariant.PRIMARY:
                bg = disabled ? theme.colors.button : (isHovered ? theme.colors.buttonHover : theme.colors.selection);
                color = '#ffffff';
                border = `1px solid ${bg}`;
                padding = `${paddingY}px ${paddingX}px`;
                break;
            case ButtonVariant.DEFAULT:
                bg = disabled ? 'transparent' : (isHovered ? theme.colors.buttonHover : theme.colors.button);
                border = `1px solid ${theme.colors.border}`;
                padding = `${paddingY}px ${paddingX}px`;
                break;
            case ButtonVariant.GHOST:
                bg = (isHovered || active) ? theme.colors.buttonHover : 'transparent';
                padding = `${paddingY}px ${paddingX}px`;
                break;
            case ButtonVariant.ICON:
                bg = (isHovered || active) ? theme.colors.buttonHover : 'transparent';
                padding = `${paddingY}px`;
                break;
        }

        if (disabled) {
            opacity = 0.5;
            cursor = 'not-allowed';
        }

        return {
            backgroundColor: bg,
            color: color,
            border: border,
            borderRadius: borderRadius,
            padding: padding,
            fontSize: fontSize,
            fontFamily: theme.typography.fontFamily,
            cursor: cursor,
            opacity: opacity,
            outline: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: theme.spacing.sm,
            transition: 'background-color 0.2s, border-color 0.2s',
            userSelect: 'none',
            ...style,
        };
    }
}
