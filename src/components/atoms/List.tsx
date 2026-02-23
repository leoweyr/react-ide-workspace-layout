import { CSSProperties, Component, ReactNode } from 'react';

import { IconName } from './enums/IconName';
import { Theme } from '../../theme/Theme';
import { Icon } from './Icon';


export interface ListItem {
    id: string;
    text: string;
    icon?: IconName;
    children?: ListItem[];  // This allows for tree view potential.
    isExpanded?: boolean;
}


export interface ListProps {
    items: ListItem[];
    selectedId?: string;
    onSelect?: (id: string) => void;
    className?: string;
    style?: CSSProperties;
}


export class List extends Component<ListProps> {
    public render(): ReactNode {
        const { items, className } = this.props;

        return (
            <ul className={className} style={this.getStyles()}>
                {items.map(item => this.renderItem(item))}
            </ul>
        );
    }

    private getStyles(): CSSProperties {
        const theme = Theme.getInstance();

        return {
            listStyle: 'none',
            padding: 0,
            margin: 0,
            width: '100%',
            backgroundColor: theme.colors.panelBackground,
            color: theme.colors.text,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.fontSize,
            ...this.props.style,
        };
    }

    private renderItem(item: ListItem, depth: number = 0): ReactNode {
        const theme = Theme.getInstance();
        const { selectedId, onSelect } = this.props;
        const isSelected: boolean = item.id === selectedId;

        const itemStyle: CSSProperties = {
            padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
            paddingLeft: `${theme.spacing.md + depth * 16}px`,
            cursor: 'pointer',
            backgroundColor: isSelected ? theme.colors.selection : 'transparent',
            color: isSelected ? '#ffffff' : theme.colors.text,
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.sm,
        };

        return (
            <li key={item.id}>
                <div 
                    style={itemStyle}
                    onClick={() => onSelect && onSelect(item.id)}
                >
                    {item.icon && <Icon name={item.icon} size={14} color="currentColor" />}
                    <span>{item.text}</span>
                </div>
                {/* This handles simple recursion for children if they are expanded. */}
                {item.children && item.isExpanded && (
                    <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                        {item.children.map(child => this.renderItem(child, depth + 1))}
                    </ul>
                )}
            </li>
        );
    }
}


export default List;
