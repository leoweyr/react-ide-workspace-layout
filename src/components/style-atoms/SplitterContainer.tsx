import { Component, ReactNode, CSSProperties } from 'react';

import { SplitterOrientation } from './enums/SplitterOrientation';


interface SplitterContainerProps {
    orientation: SplitterOrientation;
    isDragging: boolean;
    className?: string;
    style?: CSSProperties;
    containerRef?: (instance: HTMLDivElement | null) => void;
    children?: ReactNode;
}


class SplitterContainer extends Component<SplitterContainerProps> {
    public render(): ReactNode {
        const { orientation, isDragging, className, style, containerRef, children } = this.props;
        const isHorizontal = orientation === SplitterOrientation.HORIZONTAL;

        const containerStyle: CSSProperties = {
            display: 'flex',
            flexDirection: isHorizontal ? 'column' : 'row',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            userSelect: isDragging ? 'none' : 'auto',
            ...style,
        };

        return (
            <div 
                ref={containerRef} 
                className={className} 
                style={containerStyle}
            >
                {children}
            </div>
        );
    }
}


export default SplitterContainer;
