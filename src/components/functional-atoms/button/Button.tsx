import { MouseEvent, CSSProperties, Component, ReactNode, cloneElement, isValidElement, ReactElement } from 'react';

import { Icon, Size } from '../../style-atoms';
import { Tooltip } from '../tooltip';
import { ButtonVariant } from './enums/ButtonVariant';
import { Theme } from '../../../features/theme/Theme';


interface ButtonProps {
    text?: string;
    icon?: ReactElement<any, typeof Icon>;
    variant?: ButtonVariant;
    size?: Size;

    /**
     * An optional tooltip element to display on hover.
     */
    tooltip?: ReactElement<any, typeof Tooltip>;

    onClick?: (event: MouseEvent) => void;

    /**
     * Whether the button is disabled.
     * When true, interactions are disabled and the visual appearance is dimmed.
     */
    disabled?: boolean;

    /**
     * Whether the button is in an active or selected state.
     * When true, the button maintains a persistent highlighted visual state.
     */
    active?: boolean;

    className?: string;
    style?: CSSProperties;
}


interface ButtonState {
    isHovered: boolean;
}


class Button extends Component<ButtonProps, ButtonState> {
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
        const { text, icon, onClick, tooltip, className, size, disabled } = this.props;

        const buttonElement: ReactNode = (
            <button
                className={className}
                style={this.getStyles()}
                onClick={disabled ? undefined : onClick}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                disabled={disabled}
            >
                {icon && isValidElement(icon) ? cloneElement(icon as any, { 
                    size: (icon.props as any).size || size 
                }) : icon}
                {text && <span>{text}</span>}
            </button>
        );

        if (tooltip && isValidElement(tooltip)) {
            return cloneElement(tooltip as any, { 
                anchor: buttonElement 
            });
        }

        return buttonElement;
    }

    private getStyles(): CSSProperties {
        const theme: Theme = Theme.getInstance();
        const { variant, size, disabled, active, style } = this.props;
        const { isHovered } = this.state;

        let bg: string;
        let color: string;
        let border: string = '1px solid transparent';
        let padding: string;
        const borderRadius: string = theme.layout.sizing.common.borderRadius;
        let opacity: number = 1;
        let cursor: string = 'pointer';

        // Define base transitions for smooth interaction.
        const transition: string = 'background-color 0.15s, border-color 0.15s, opacity 0.15s';

        // Calculate spacing based on theme and size.
        const paddingX: number = 4;
        const paddingY: number = 2.5;
        const fontSize: string = theme.typography.font.size;

        // Apply variant-specific styling logic.
        switch (variant) {
            case ButtonVariant.PRIMARY:
                bg = theme.colors.selection.background;
                color = '#ffffff';
                border = `1px solid ${bg}`;
                padding = `${paddingY}px ${paddingX}px`;
                
                if (isHovered && !disabled) {
                    opacity = 0.9;
                }

                break;

            case ButtonVariant.GHOST:
                bg = (isHovered || active) ? theme.colors.button.fillHover : 'transparent';
                color = theme.colors.neutral.text;
                padding = `${paddingY}px ${paddingX}px`;

                break;

            case ButtonVariant.ICON:
                bg = (isHovered || active) ? theme.colors.button.fillHover : 'transparent';
                color = theme.colors.neutral.text;
                padding = `${paddingY}px`;

                break;
            case ButtonVariant.DEFAULT:
            default:
                bg = isHovered ? theme.colors.button.fillHover : theme.colors.button.fill;
                color = theme.colors.neutral.text;
                border = `1px solid ${theme.colors.neutral.border}`;
                padding = `${paddingY}px ${paddingX}px`;
        }

        if (disabled) {
            opacity = 0.5;
            cursor = 'not-allowed';

            if (variant === ButtonVariant.PRIMARY) {
                bg = theme.colors.neutral.border;
                border = `1px solid ${theme.colors.neutral.border}`;
            }
        }

        return {
            backgroundColor: bg,
            color: color,
            border: border,
            borderRadius: borderRadius,
            padding: padding,
            margin: 0,  // Explicitly clear the button's external margins.
            fontSize: fontSize,
            fontFamily: theme.typography.font.family,
            lineHeight: 1,  // Force the line height to equal the font size.
            cursor: cursor,
            opacity: opacity,
            outline: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: theme.layout.spacing.small,
            transition: transition,
            userSelect: 'none',
            boxSizing: 'border-box',
            verticalAlign: 'middle',
            ...style,
        };
    }
}


export default Button;
