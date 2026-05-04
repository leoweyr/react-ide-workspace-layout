import { ReactNode, CSSProperties, Component } from 'react';

import { Theme } from '../../features/theme/Theme';
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
        const { orientation = ToolbarOrientation.HORIZONTAL, gap = theme.layout.spacing.small, style } = this.props;
    
        const isHorizontal: boolean = orientation === ToolbarOrientation.HORIZONTAL;

        return {
            display: 'flex',
            flexDirection: isHorizontal ? 'row' : 'column',
            gap: gap,
            padding: theme.layout.spacing.extraSmall,
            backgroundColor: theme.colors.toolbar.background,
            borderBottom: isHorizontal ? `${theme.layout.sizing.common.borderWidth} solid ${theme.colors.neutral.border}` : 'none',
            borderRight: !isHorizontal ? `${theme.layout.sizing.common.borderWidth} solid ${theme.colors.neutral.border}` : 'none',
            alignItems: 'center',
            height: isHorizontal ? `${theme.layout.sizing.bars.topHeight}px` : '100%',
            width: !isHorizontal ? `${theme.layout.sizing.bars.sideWidth}px` : '100%',
            boxSizing: 'border-box',
            ...style,
        };
    }
}


export default Toolbar;
