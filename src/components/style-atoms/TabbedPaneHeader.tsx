import { Component, ReactNode, CSSProperties } from 'react';

import { Theme } from '../../theme/Theme';


interface TabbedPaneHeaderProps {
    style?: CSSProperties;
    children?: ReactNode;
}


class TabbedPaneHeader extends Component<TabbedPaneHeaderProps> {
    public render(): ReactNode {
        const { style, children } = this.props;
        const theme = Theme.getInstance();

        const headerStyle: CSSProperties = {
            display: 'flex',
            borderBottom: `1px solid ${theme.colors.border}`,
            backgroundColor: theme.colors.panelBackground,
            ...style,
        };

        return (
            <div style={headerStyle}>
                {children}
            </div>
        );
    }
}


export default TabbedPaneHeader;
