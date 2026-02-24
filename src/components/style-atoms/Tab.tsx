import { Component, ReactNode, CSSProperties, MouseEvent } from 'react';

import { Theme } from '../../theme/Theme';
import Icon from './Icon';
import { IconName } from './enums/IconName';


interface TabProps {
    title: string;
    isActive?: boolean;
    isModified?: boolean;
    isHovered: boolean;
    isCloseHovered: boolean;
    icon?: IconName;
    onClick?: (event: MouseEvent) => void;
    onClose?: (event: MouseEvent) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onCloseMouseEnter?: (event: MouseEvent) => void;
    onCloseMouseLeave?: (event: MouseEvent) => void;
    className?: string;
    style?: CSSProperties;
}


class Tab extends Component<TabProps> {
    public render(): ReactNode {
        const theme = Theme.getInstance();
        const { title, icon, isActive, isModified, isHovered, isCloseHovered, onClick, onClose, onMouseEnter, onMouseLeave, onCloseMouseEnter, onCloseMouseLeave, className } = this.props;

        return (
            <div 
                className={className} 
                style={this.getStyles()}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
            >
                {icon && (
                    <Icon 
                        name={icon} 
                        size={14} 
                        color={isActive ? theme.colors.selection : theme.colors.textSecondary}
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
                            onMouseEnter={onCloseMouseEnter}
                            onMouseLeave={onCloseMouseLeave}
                            onClick={(event) => { event.stopPropagation(); onClose && onClose(event); }}
                            style={{
                                opacity: isHovered || isActive ? 1 : 0,
                                borderRadius: '3px',
                                backgroundColor: isCloseHovered ? theme.colors.buttonHover : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 16,
                                height: 16,
                            }}
                        >
                            <Icon name={IconName.CLOSE} size={10} color={theme.colors.text} />
                        </div>
                    )
                )}
            </div>
        );
    }

    private getStyles(): CSSProperties {
        const theme = Theme.getInstance();
        const { isActive, isHovered, style } = this.props;

        let bg: string = theme.colors.tabInactive;
        let color: string = theme.colors.textSecondary;
        let borderBottom: string = '2px solid transparent';

        if (isActive) {
            bg = theme.colors.tabActive;
            color = theme.colors.text;
            borderBottom = `2px solid ${theme.colors.selection}`;
        } else if (isHovered) {
            bg = theme.colors.panelBackground;
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


export default Tab;
