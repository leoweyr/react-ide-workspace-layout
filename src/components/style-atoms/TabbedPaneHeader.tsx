import { Component, ReactNode, CSSProperties } from 'react';

import { Theme } from '../../features/theme/Theme';


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
            borderBottom: `${theme.layout.sizing.common.borderWidth} solid ${theme.colors.neutral.border}`,
            backgroundColor: theme.colors.neutral.panelBackground,
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
