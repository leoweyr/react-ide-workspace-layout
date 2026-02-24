import { Component, CSSProperties, ReactNode } from 'react';

import { Theme } from '../../theme/Theme';


interface ListProps {
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
}


class List extends Component<ListProps> {
    public render(): ReactNode {
        const { className, style, children } = this.props;
        const theme = Theme.getInstance();

        const listStyle: CSSProperties = {
            listStyle: 'none',
            padding: 0,
            margin: 0,
            width: '100%',
            backgroundColor: theme.colors.panelBackground,
            color: theme.colors.text,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.fontSize,
            ...style,
        };

        return (
            <ul className={className} style={listStyle}>
                {children}
            </ul>
        );
    }
}


export default List;
