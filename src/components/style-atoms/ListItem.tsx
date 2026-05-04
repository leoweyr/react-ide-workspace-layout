import { Component, CSSProperties, ReactNode } from 'react';

import { Theme } from '../../features/theme/Theme';
import { IconName } from './enums/IconName';
import Icon from './Icon';


interface ListItemProps {
    id: string;
    text: string;
    icon?: IconName;
    isSelected?: boolean;
    depth?: number;
    onClick?: (id: string) => void;
    children?: ReactNode;  // For nested lists.
}


class ListItem extends Component<ListItemProps> {
    public render(): ReactNode {
        const { id, text, icon, isSelected, depth = 0, onClick, children } = this.props;
        const theme = Theme.getInstance();

        const itemStyle: CSSProperties = {
            padding: `${theme.layout.spacing.extraSmall}px ${theme.layout.spacing.medium}px`,
            paddingLeft: `${theme.layout.spacing.medium + depth * 16}px`,
            backgroundColor: isSelected ? theme.colors.selection.background : 'transparent',
            color: isSelected ? '#ffffff' : theme.colors.neutral.text,
            display: 'flex',
            alignItems: 'center',
            gap: theme.layout.spacing.small,
            userSelect: 'none',
        };

        return (
            <li>
                <div 
                    style={itemStyle}
                    onClick={() => onClick && onClick(id)}
                >
                    {icon && <Icon name={icon} size={14} color="currentColor" />}
                    <span>{text}</span>
                </div>
                {children}
            </li>
        );
    }
}


export default ListItem;
