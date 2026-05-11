import {
    Component,
    ReactNode,
    CSSProperties,
    MouseEvent as ReactMouseEvent,
    cloneElement,
    ReactElement,
    isValidElement
} from 'react';

import { Theme } from '../../../features/theme/Theme';
import {
    Icon,
    Size,
    JETBRAINS_ICONS
} from '../../style-atoms';


interface TabProps {
    icon: ReactElement<any, typeof Icon>;
    title: string;

    /** Whether the tab has a notification. */
    hasNotification?: boolean;

    /** Whether the tab is currently active. */
    isActive?: boolean;

    /** Whether the tab (or its relative container) currently has focus. Defaults to true. */
    isFocused?: boolean;

    onClick?: (event: ReactMouseEvent) => void;
    onClose?: (event: ReactMouseEvent) => void;
    className?: string;
    style?: CSSProperties;
}


interface TabState {
    isHovered: boolean;
    isCloseHovered: boolean;
}


class Tab extends Component<TabProps, TabState> {
    private readonly _closeIconSize: number = 10;  // Manually aligned with IDEA dimensions.
    private readonly _closeButtonSize: number = 16;  // Manually aligned with IDEA dimensions.

    private handleMouseEnter: () => void = (): void => {
        this.setState({ isHovered: true });
    };

    private handleMouseLeave: () => void = (): void => {
        this.setState({ isHovered: false, isCloseHovered: false });
    };

    private handleCloseMouseEnter: () => void = (): void => {
        this.setState({ isCloseHovered: true });
    };

    private handleCloseMouseLeave: () => void = (): void => {
        this.setState({ isCloseHovered: false });
    };

    constructor(props: TabProps) {
        super(props);

        this.state = {
            isHovered: false,
            isCloseHovered: false,
        };
    }

    public render(): ReactNode {
        const theme: Theme = Theme.getInstance();

        const {
            icon,
            title,
            isActive = false,
            isFocused = true,
            hasNotification,
            onClose,
            onClick,
            className
        } = this.props;

        const { isHovered, isCloseHovered } = this.state;

        return (
            <div
                className={className}
                style={this.getStyles(isActive, isHovered)}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={onClick}
            >
                {isActive && <div style={this.getActiveIndicatorStyles(theme, isFocused)} />}

                {icon && isValidElement(icon) && cloneElement(icon as ReactElement, {
                    size: Size.SMALL,
                    color: isActive ? theme.colors.selection.background : theme.colors.neutral.textSecondary,
                    style: { marginRight: `6px`, ...icon.props.style }  // Manually aligned with IDEA dimensions.
                })}

                <span style={this.getTextStyles()}>
                    {title}
                </span>

                {hasNotification && !isHovered ? (
                    <div style={this.getNotificationIndicatorStyles(theme)} />
                ) : (
                    (onClose || isHovered) && (
                        <div
                            onMouseEnter={this.handleCloseMouseEnter}
                            onMouseLeave={this.handleCloseMouseLeave}
                            onClick={(event: ReactMouseEvent): void => {
                                event.stopPropagation();
                                if (onClose) onClose(event);
                            }}
                            style={this.getCloseButtonStyles(theme, isActive, isHovered, isCloseHovered)}
                        >
                            {cloneElement(JETBRAINS_ICONS.Close as any, {
                                color: theme.colors.attention.unfocus,  // Manually aligned with IDEA dimensions.
                                style: {
                                    width: this._closeIconSize,
                                    height: this._closeIconSize
                                }
                            })}
                        </div>
                    )
                )}
            </div>
        );
    }

    private getStyles(isActive: boolean, isHover: boolean): CSSProperties {
        const theme: Theme = Theme.getInstance();
        const { style } = this.props;

        let color: string = theme.colors.neutral.textSecondary;

        if (isActive) {
            color = theme.colors.neutral.text;
        } else if (isHover) {
            color = theme.colors.neutral.text;
        }

        return {
            display: 'inline-flex',
            alignItems: 'center',
            position: 'relative',
            padding: `0 5px`,  // Manually aligned with IDEA dimensions.
            height: '40.5px',  // Manually aligned with IDEA dimensions.
            color: color,
            cursor: 'pointer',
            fontSize: theme.typography.font.sizeLarge,  // Manually aligned with IDEA dimensions.
            fontFamily: theme.typography.font.family,
            userSelect: 'none',
            transition: 'background-color 0.1s, color 0.1s',
            ...style,
        };
    }

    private getActiveIndicatorStyles(theme: Theme, isFocused: boolean): CSSProperties {
        return {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',  // Manually aligned with IDEA dimensions.
            backgroundColor: isFocused ? theme.colors.attention.focus : theme.colors.attention.unfocus,  // Manually aligned with IDEA dimensions.
            borderRadius: '2px 2px 2px 2px',
        };
    }

    private getTextStyles(): CSSProperties {
        return {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginRight: `7.5px`,  // Manually aligned with IDEA dimensions.
        };
    }

    private getNotificationIndicatorStyles(theme: Theme): CSSProperties {
        return {
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: theme.colors.neutral.textSecondary,
        };
    }

    private getCloseButtonStyles(theme: Theme, isActive: boolean, isHover: boolean, isCloseHovered: boolean): CSSProperties {
        return {
            opacity: isHover || isActive ? 1 : 0,
            borderRadius: '50%',
            backgroundColor: isCloseHovered ? theme.colors.button.fillHover : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: this._closeButtonSize,
            height: this._closeButtonSize,
        };
    }
}


export default Tab;
