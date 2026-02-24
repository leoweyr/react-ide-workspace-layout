import { Component, ReactNode, CSSProperties, MouseEvent } from 'react';

import { Theme } from '../../theme/Theme';
import { SplitterOrientation } from './enums/SplitterOrientation';


interface ScrollbarThumbProps {
    orientation: SplitterOrientation;
    positionPercent: number;
    sizePercent: number;
    isDragging: boolean;
    isHovered: boolean;
    onMouseDown: (event: MouseEvent) => void;
}


class ScrollbarThumb extends Component<ScrollbarThumbProps> {
    public render(): ReactNode {
        const { orientation, positionPercent, sizePercent, isDragging, isHovered, onMouseDown } = this.props;
        const theme = Theme.getInstance();
        const isHorizontal = orientation === SplitterOrientation.HORIZONTAL;

        const thumbStyle: CSSProperties = {
            position: 'absolute',
            top: isHorizontal ? 0 : `${positionPercent}%`,
            left: isHorizontal ? `${positionPercent}%` : 0,
            width: isHorizontal ? `${Math.max(sizePercent, 10)}%` : '6px',
            height: isHorizontal ? '6px' : `${Math.max(sizePercent, 10)}%`,
            margin: '2px',
            backgroundColor: (isDragging || isHovered) ? theme.colors.textSecondary : theme.colors.border,
            borderRadius: '3px',
            opacity: (isDragging || isHovered) ? 0.8 : 0.4,
            transition: 'opacity 0.2s, background-color 0.2s',
            cursor: 'default',
        };

        return (
            <div
                onMouseDown={onMouseDown}
                style={thumbStyle}
            />
        );
    }
}


export default ScrollbarThumb;
