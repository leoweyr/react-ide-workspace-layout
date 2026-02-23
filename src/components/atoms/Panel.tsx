import { ReactNode, CSSProperties, Component } from 'react';

import { Theme } from '../../theme/Theme';


export interface PanelProps {
    children?: ReactNode;
    padding?: string | number;
    backgroundColor?: string;
    border?: string;
    width?: string | number;
    height?: string | number;
    className?: string;
    style?: CSSProperties;
}


export class Panel extends Component<PanelProps> {
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
            padding: padding ?? theme.spacing.md,
            backgroundColor: backgroundColor ?? theme.colors.panelBackground,
            border: border,
            width: width,
            height: height,
            color: theme.colors.text,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.fontSize,
            ...style,
        };
    }
}


export default Panel;
