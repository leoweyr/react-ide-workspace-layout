import { ReactNode, CSSProperties, Component, RefObject } from 'react';

import { Theme } from '../../features/theme/Theme';
import { Orientation } from './enums/Orientation';


interface ToolbarProps {
    /** The content to be rendered within the toolbar. */
    children: ReactNode;

    /** The layout orientation of the toolbar. */
    orientation?: Orientation;

    /** The spacing between children elements. */
    gap?: number;

    /** The padding along the primary axis of the toolbar (Horizontal for horizontal toolbars, vertical for vertical ones). */
    padding?: number;

    /** The thickness (height when horizontal, width when vertical) of the toolbar. */
    thickness?: number;

    /** Optional ref for the root div element. */
    innerRef?: RefObject<HTMLDivElement>;

    className?: string;
    style?: CSSProperties;
}


class Toolbar extends Component<ToolbarProps> {
    public render(): ReactNode {
        return (
            <div ref={this.props.innerRef} className={this.props.className} style={this.getStyles()}>
                {this.props.children}
            </div>
        );
    }

    private getStyles(): CSSProperties {
        const theme: Theme = Theme.getInstance();

        const { 
            orientation = Orientation.HORIZONTAL, 
            gap = theme.layout.spacing.small,
            padding = theme.layout.spacing.medium,
            thickness,
            style 
        } = this.props;

        const isHorizontal: boolean = orientation === Orientation.HORIZONTAL;

        const finalThickness: string = thickness !== undefined ? `${thickness}px` : "39px";

        // Apply padding to the start/end of the bar based on orientation.
        const paddingX: string = isHorizontal ? `${padding}px` : `0px`;
        const paddingY: string = isHorizontal ? `0px` : `${padding}px`;

        return {
            display: 'flex',
            flexDirection: isHorizontal ? 'row' : 'column',
            gap: gap,
            padding: `${paddingY} ${paddingX}`,
            backgroundColor: theme.colors.toolbar.background,
            borderTop: isHorizontal ? `${theme.layout.sizing.common.borderWidth} solid ${theme.colors.neutral.border}` : 'none',
            borderBottom: isHorizontal ? `${theme.layout.sizing.common.borderWidth} solid ${theme.colors.neutral.border}` : 'none',
            borderLeft: !isHorizontal ? `${theme.layout.sizing.common.borderWidth} solid ${theme.colors.neutral.border}` : 'none',
            borderRight: !isHorizontal ? `${theme.layout.sizing.common.borderWidth} solid ${theme.colors.neutral.border}` : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            height: isHorizontal ? finalThickness : '100%',
            width: !isHorizontal ? finalThickness : '100%',
            boxSizing: 'border-box',
            lineHeight: 1,
            ...style,
        };
    }
}


export default Toolbar;
