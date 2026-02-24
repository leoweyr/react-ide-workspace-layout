import { Component, ReactNode, CSSProperties } from 'react';

import { SplitterOrientation } from './enums/SplitterOrientation';


interface ScrollbarTrackProps {
    orientation: SplitterOrientation;
    className?: string;
    style?: CSSProperties;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    children?: ReactNode;
    trackRef?: (instance: HTMLDivElement | null) => void;
}


class ScrollbarTrack extends Component<ScrollbarTrackProps> {
    public render(): ReactNode {
        const { orientation, className, style, onMouseEnter, onMouseLeave, children, trackRef } = this.props;
        const isHorizontal = orientation === SplitterOrientation.HORIZONTAL;

        const trackStyle: CSSProperties = {
            position: 'absolute',
            top: isHorizontal ? 'auto' : 0,
            bottom: 0,
            left: isHorizontal ? 0 : 'auto',
            right: 0,
            width: isHorizontal ? '100%' : '10px',
            height: isHorizontal ? '10px' : '100%',
            backgroundColor: 'transparent',
            zIndex: 100,
            ...style,
        };

        return (
            <div
                ref={trackRef}
                className={className}
                style={trackStyle}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {children}
            </div>
        );
    }
}


export default ScrollbarTrack;
