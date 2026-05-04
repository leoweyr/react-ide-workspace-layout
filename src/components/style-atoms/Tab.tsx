import { Component, ReactNode, CSSProperties, MouseEvent } from 'react';

import { Theme } from '../../features/theme/Theme';
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
                        color={isActive ? theme.colors.selection.background : theme.colors.neutral.textSecondary}
                        style={{ marginRight: theme.layout.spacing.medium }} 
                    />
                )}
        
                <span style={{ 
                    flex: 1, 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    marginRight: theme.layout.spacing.medium
                }}>
                    {title}
                </span>

                {isModified && !isHovered ? (
                    <div style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: theme.colors.neutral.textSecondary,
                    }} />
                ) : (
                    (onClose || isHovered) && (
                        <div 
                            onMouseEnter={onCloseMouseEnter}
                            onMouseLeave={onCloseMouseLeave}
                            onClick={(event) => { event.stopPropagation(); onClose && onClose(event); }}
                            style={{
                                opacity: isHovered || isActive ? 1 : 0,
                                borderRadius: theme.layout.sizing.common.borderRadius,
                                backgroundColor: isCloseHovered ? theme.colors.button.fillHover : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 16,
                                height: 16,
                            }}
                        >
                            <Icon name={IconName.CLOSE} size={10} color={theme.colors.neutral.text} />
                        </div>
                    )
                )}
            </div>
        );
    }

    private getStyles(): CSSProperties {
        const theme = Theme.getInstance();
        const { isActive, isHovered, style } = this.props;

        let bg: string = theme.colors.tab.inactiveBackground;
        let color: string = theme.colors.neutral.textSecondary;
        let borderBottom: string = `${theme.layout.sizing.common.borderWidth} solid transparent`;

        if (isActive) {
            bg = theme.colors.tab.activeBackground;
            color = theme.colors.neutral.text;
            borderBottom = `${theme.layout.sizing.common.borderWidth} solid ${theme.colors.tab.activeUnderline}`;
        } else if (isHovered) {
            bg = theme.colors.neutral.panelBackground;
            color = theme.colors.neutral.text;
        }

        return {
            display: 'inline-flex',
            alignItems: 'center',
            padding: `0 ${theme.layout.spacing.large}px`,
            height: '32px',
            backgroundColor: bg,
            color: color,
            borderRight: `${theme.layout.sizing.common.borderWidth} solid ${theme.colors.neutral.border}`,
            borderBottom: borderBottom,
            cursor: 'pointer',
            fontSize: theme.typography.font.size,
            fontFamily: theme.typography.font.family,
            userSelect: 'none',
            transition: 'background-color 0.1s, color 0.1s',
            maxWidth: '200px',
            minWidth: '80px',
            ...style,
        };
    }
}


export default Tab;
