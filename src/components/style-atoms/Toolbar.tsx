import { ReactNode, CSSProperties, Component } from 'react';

import { Theme } from '../../theme/Theme';
import { ToolbarOrientation } from './enums/ToolbarOrientation';


interface ToolbarProps {
    children: ReactNode;
    orientation?: ToolbarOrientation;
    gap?: number;
    className?: string;
    style?: CSSProperties;
}


class Toolbar extends Component<ToolbarProps> {
    public render(): ReactNode {
        return (
            <div className={this.props.className} style={this.getStyles()}>
                {this.props.children}
            </div>
        );
    }

    private getStyles(): CSSProperties {
        const theme = Theme.getInstance();
        const { orientation = ToolbarOrientation.HORIZONTAL, gap = theme.spacing.sm, style } = this.props;
    
        const isHorizontal: boolean = orientation === ToolbarOrientation.HORIZONTAL;

        return {
            display: 'flex',
            flexDirection: isHorizontal ? 'row' : 'column',
            gap: gap,
            padding: theme.spacing.xs,
            backgroundColor: theme.colors.toolbar,
            borderBottom: isHorizontal ? `1px solid ${theme.colors.border}` : 'none',
            borderRight: !isHorizontal ? `1px solid ${theme.colors.border}` : 'none',
            alignItems: 'center',
            height: isHorizontal ? '36px' : '100%',
            width: !isHorizontal ? '36px' : '100%',
            boxSizing: 'border-box',
            ...style,
        };
    }
}


export default Toolbar;
