import { Component, ReactNode, CSSProperties } from 'react';

import { Theme } from '../../theme/Theme';


interface TabbedPaneContentProps {
    style?: CSSProperties;
    children?: ReactNode;
}


class TabbedPaneContent extends Component<TabbedPaneContentProps> {
    public render(): ReactNode {
        const { style, children } = this.props;
        const theme = Theme.getInstance();

        const contentStyle: CSSProperties = {
            flex: 1,
            overflow: 'auto',
            backgroundColor: theme.colors.background,
            ...style,
        };

        return (
            <div style={contentStyle}>
                {children}
            </div>
        );
    }
}


export default TabbedPaneContent;
