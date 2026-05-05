import { Component, ReactNode, CSSProperties } from 'react';

import { Theme } from '../../features/theme/Theme';
import { TooltipPosition } from './enums/TooltipPosition';


interface TooltipProps {
    text: string;
    anchor: ReactNode;

    /**
     * The placement of the tooltip relative to the anchor.
     * Defaults to 'BOTTOM'.
     */
    position?: TooltipPosition;

    isVisible?: boolean;
    className?: string;
    style?: CSSProperties;
}


interface TooltipState {
    show: boolean;
}


class Tooltip extends Component<TooltipProps, TooltipState> {
    constructor(props: TooltipProps) {
        super(props);

        this.state = {
            show: false,
        };
    }

    private handleMouseEnter: () => void = (): void => {
        this.setState({ show: true });
    };

    private handleMouseLeave: () => void = (): void => {
        this.setState({ show: false });
    };

    public render(): ReactNode {
        const { text, anchor, isVisible, className } = this.props;
        const { show } = this.state;
        const visible: boolean = isVisible ?? show;

        const wrapperStyle: CSSProperties = {
            position: 'relative',
            display: 'inline-block',
        };

        return (
            <div 
                style={wrapperStyle}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                className={className}
            >
                {anchor}
                {visible && (
                    <div style={this.getTooltipStyles()}>
                        {text}
                    </div>
                )}
            </div>
        );
    }

    private getTooltipStyles(): CSSProperties {
        const theme: Theme = Theme.getInstance();
        const { position, style } = this.props;

        let positionStyle: CSSProperties = {};

        switch (position) {
            case TooltipPosition.TOP:
                positionStyle = {
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%) translateY(-8px)',
                };
                
                break;
            case TooltipPosition.LEFT:
                positionStyle = {
                    top: '50%',
                    right: '100%',
                    transform: 'translateY(-50%) translateX(-8px)',
                };

                break;
            case TooltipPosition.RIGHT:
                positionStyle = {
                    top: '50%',
                    left: '100%',
                    transform: 'translateY(-50%) translateX(8px)',
                };

                break;
            case TooltipPosition.BOTTOM:
            default:
                positionStyle = {
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%) translateY(8px)',
                };

                break;
        }

        return {
            position: 'absolute',
            backgroundColor: theme.colors.tooltip.background,
            color: theme.colors.tooltip.text,
            padding: `7px 11px`,  // Manually aligned with IDEA dimensions.
            borderRadius: theme.layout.sizing.common.borderRadius,
            border: `${theme.layout.sizing.common.borderWidth} solid ${theme.colors.tooltip.border}`,
            fontSize: theme.typography.font.sizeSmall,
            fontFamily: theme.typography.font.family,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 1000,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            ...positionStyle,
            ...style,
        };
    }
}


export default Tooltip;
