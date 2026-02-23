import { MouseEvent, CSSProperties, Component, ReactNode } from 'react';

import { IconName } from './enums/IconName';
import { Theme } from '../../theme/Theme';
import { Icon } from './Icon';


export interface TabProps {
    title: string;
    isActive?: boolean;
    isModified?: boolean;
    icon?: IconName;
    onClose?: (event: MouseEvent) => void;
    onClick?: (event: MouseEvent) => void;
    className?: string;
    style?: CSSProperties;
}


export interface TabState {
    isHovered: boolean;
    isCloseHovered: boolean;
}


export class Tab extends Component<TabProps, TabState> {
    private handleMouseEnter: () => void = (): void => {
        this.setState({ isHovered: true });
    };

    private handleMouseLeave: () => void = (): void => {
        this.setState({ isHovered: false });
    };

    private handleCloseMouseEnter: (event: MouseEvent) => void = (event: MouseEvent): void => {
        event.stopPropagation();
        this.setState({ isCloseHovered: true });
    };

    private handleCloseMouseLeave: (event: MouseEvent) => void = (event: MouseEvent): void => {
        event.stopPropagation();
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
        const theme = Theme.getInstance();
        const { title, icon, isModified, onClose, onClick, className } = this.props;
        const { isHovered, isCloseHovered } = this.state;

        return (
            <div 
                className={className} 
                style={this.getStyles()}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={onClick}
            >
                {icon && (
                    <Icon 
                        name={icon} 
                        size={14} 
                        color={this.props.isActive ? theme.colors.selection : theme.colors.textSecondary}
                        style={{ marginRight: theme.spacing.md }} 
                    />
                )}
        
                <span style={{ 
                    flex: 1, 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    marginRight: theme.spacing.md
                }}>
                    {title}
                </span>

                {/* This displays the close button or modified indicator. */}
                {isModified && !isHovered ? (
                    <div style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: theme.colors.textSecondary,
                    }} />
                ) : (
                    (onClose || isHovered) && (
                          <div 
                              onMouseEnter={this.handleCloseMouseEnter}
                              onMouseLeave={this.handleCloseMouseLeave}
                              onClick={(event) => { event.stopPropagation(); onClose && onClose(event); }}
                              style={{
                                  opacity: isHovered || this.props.isActive ? 1 : 0,
                                  borderRadius: '3px',
                                  backgroundColor: isCloseHovered ? theme.colors.buttonHover : 'transparent',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: 16,
                                  height: 16,
                              }}
                          >
                              <Icon name="close" size={10} color={theme.colors.text} />
                          </div>
                    )
                )}
            </div>
        );
    }

    private getStyles(): CSSProperties {
        const theme = Theme.getInstance();
        const { isActive, style } = this.props;
        const { isHovered } = this.state;

        let bg: string = theme.colors.tabInactive;
        let color: string = theme.colors.textSecondary;
        let borderBottom: string = `2px solid transparent`;

        if (isActive) {
            bg = theme.colors.tabActive;
            color = theme.colors.text;
            borderBottom = `2px solid ${theme.colors.selection}`;
        } else if (isHovered) {
            bg = theme.colors.panelBackground;  // This color is slightly lighter.
            color = theme.colors.text;
        }

        return {
            display: 'inline-flex',
            alignItems: 'center',
            padding: `0 ${theme.spacing.lg}px`,
            height: '32px',
            backgroundColor: bg,
            color: color,
            borderRight: `1px solid ${theme.colors.border}`,
            borderBottom: borderBottom,
            cursor: 'pointer',
            fontSize: theme.typography.fontSize,
            fontFamily: theme.typography.fontFamily,
            userSelect: 'none',
            transition: 'background-color 0.1s, color 0.1s',
            maxWidth: '200px',
            minWidth: '80px',
            ...style,
        };
    }
}
