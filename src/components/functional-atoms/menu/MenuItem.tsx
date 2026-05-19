import { Component, ReactNode, CSSProperties, MouseEvent as ReactMouseEvent } from 'react';

import { Theme } from '../../../features';


interface MenuItemProps {
    children?: ReactNode;
    onClick?: (event: ReactMouseEvent) => void;
    onMouseEnter?: (event: ReactMouseEvent) => void;
    onMouseLeave?: (event: ReactMouseEvent) => void;
    className?: string;
    style?: CSSProperties;
}


interface MenuItemState {
    isHovered: boolean;
}


class MenuItem extends Component<MenuItemProps, MenuItemState> {
    private handleMouseEnter: (event: ReactMouseEvent) => void = (event: ReactMouseEvent): void => {
        this.setState({ isHovered: true });

        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(event);
        }
    };

    private handleMouseLeave: (event: ReactMouseEvent) => void = (event: ReactMouseEvent): void => {
        this.setState({ isHovered: false });

        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(event);
        }
    };

    constructor(props: MenuItemProps) {
        super(props);

        this.state = {
            isHovered: false,
        };
    }

    public render(): ReactNode {
        const { children, onClick, className, style }: MenuItemProps = this.props;

        return (
            <div
                className={className}
                style={this.getContainerStyles(style)}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={onClick}
            >
                {/* Background selection layer. */}
                <div style={this.getBackgroundStyles()} />

                {/* Content layer. */}
                <div style={this.getContentStyles()}>
                    {children}
                </div>
            </div>
        );
    }

    private getContainerStyles(customStyle?: CSSProperties): CSSProperties {
        return {
            position: 'relative',
            cursor: 'pointer',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            width: '100%',
            ...customStyle,
        };
    }

    private getBackgroundStyles(): CSSProperties {
        const theme: Theme = Theme.getInstance();
        const { isHovered }: MenuItemState = this.state;

        return {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: isHovered ? theme.colors.selection.background : 'transparent',
            opacity: 0.3,  // Make the background color match #D4E2FF.
            borderRadius: theme.layout.sizing.common.borderRadius,
            zIndex: 0,
        };
    }

    private getContentStyles(): CSSProperties {
        const theme: Theme = Theme.getInstance();
        const { isHovered }: MenuItemState = this.state;

        return {
            display: 'flex',
            alignItems: 'center',
            gap: theme.layout.spacing.small,
            padding: `4px ${theme.layout.spacing.medium}px`,  // Manually aligned with IDEA dimensions.
            color: isHovered ? '#ffffff' : theme.colors.neutral.text,
            position: 'relative',
            zIndex: 1,
            boxSizing: 'border-box',
            width: '100%',
        };
    }
}


export default MenuItem;
