import { Component, ReactNode, CSSProperties } from 'react';

import { IconName } from '../style-atoms/enums/IconName';
import StyledList from '../style-atoms/List';
import StyledListItem from '../style-atoms/ListItem';


interface ListItem {
    id: string;
    text: string;
    icon?: IconName;
    children?: ListItem[];
    isExpanded?: boolean;
}


interface ListProps {
    items: ListItem[];
    selectedId?: string;
    onSelect?: (id: string) => void;
    className?: string;
    style?: CSSProperties;
}


class List extends Component<ListProps> {
    public render(): ReactNode {
        const { items, className, style } = this.props;

        return (
            <StyledList className={className} style={style}>
                {items.map(item => this.renderItem(item))}
            </StyledList>
        );
    }

    private renderItem(item: ListItem, depth: number = 0): ReactNode {
        const { selectedId, onSelect } = this.props;
        const isSelected: boolean = item.id === selectedId;

        return (
            <StyledListItem
                key={item.id}
                id={item.id}
                text={item.text}
                icon={item.icon}
                isSelected={isSelected}
                depth={depth}
                onClick={onSelect}
            >
                {item.children && item.isExpanded && (
                    <StyledList>
                        {item.children.map(child => this.renderItem(child, depth + 1))}
                    </StyledList>
                )}
            </StyledListItem>
        );
    }
}


export default List;
