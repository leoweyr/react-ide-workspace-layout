import { ReactNode, CSSProperties, Component } from 'react';

import { Theme } from '../../features/theme/Theme';
import { Orientation } from './enums/Orientation';


interface ToolbarProps {
    /** The content to be rendered within the toolbar. */
    children: ReactNode;

    /** The layout orientation of the toolbar. */
    orientation?: Orientation;

    /** The spacing between children elements. */
    gap?: number;

    /** The thickness (height when horizontal, width when vertical) of the toolbar. */
    thickness?: number;

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

        const { 
            orientation = Orientation.HORIZONTAL, 
            gap = theme.layout.spacing.small, 
            thickness,
            style 
        } = this.props;

        const isHorizontal: boolean = orientation === Orientation.HORIZONTAL;

        const finalThickness: string = thickness !== undefined 
            ? `${thickness}px` 
            : (isHorizontal ? `${theme.layout.sizing.bars.topHeight}px` : `${theme.layout.sizing.bars.sideWidth}px`);

        return {
            display: 'flex',
            flexDirection: isHorizontal ? 'row' : 'column',
            gap: gap,
            padding: theme.layout.spacing.extraSmall,
            backgroundColor: theme.colors.toolbar.background,
            borderBottom: isHorizontal ? `${theme.layout.sizing.common.borderWidth} solid ${theme.colors.neutral.border}` : 'none',
            borderRight: !isHorizontal ? `${theme.layout.sizing.common.borderWidth} solid ${theme.colors.neutral.border}` : 'none',
            alignItems: 'center',
            height: isHorizontal ? finalThickness : '100%',
            width: !isHorizontal ? finalThickness : '100%',
            boxSizing: 'border-box',
            ...style,
        };
    }
}


export default Toolbar;
