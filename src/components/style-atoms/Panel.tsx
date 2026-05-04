import { ReactNode, CSSProperties, Component } from 'react';

import { Theme } from '../../features/theme/Theme';


interface PanelProps {
    children?: ReactNode;
    padding?: string | number;
    backgroundColor?: string;
    border?: string;
    width?: string | number;
    height?: string | number;
    className?: string;
    style?: CSSProperties;
}


class Panel extends Component<PanelProps> {
    public render(): ReactNode {
        const { children, className } = this.props;

        return (
            <div className={className} style={this.getStyles()}>
                {children}
            </div>
        );
    }

    private getStyles(): CSSProperties {
        const theme = Theme.getInstance();
        const { 
            padding, 
            backgroundColor, 
            border, 
            width = '100%', 
            height = '100%', 
            style 
        } = this.props;

        return {
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            padding: padding ?? theme.layout.spacing.medium,
            backgroundColor: backgroundColor ?? theme.colors.neutral.panelBackground,
            border: border,
            width: width,
            height: height,
            color: theme.colors.neutral.text,
            fontFamily: theme.typography.font.family,
            fontSize: theme.typography.font.size,
            ...style,
        };
    }
}


export default Panel;
