import { Component, ReactNode, CSSProperties, MouseEvent } from 'react';

import { SplitterOrientation } from '../style-atoms/enums/SplitterOrientation';
import StyledScrollbarThumb from '../style-atoms/ScrollbarThumb';
import StyledScrollbarTrack from '../style-atoms/ScrollbarTrack';


interface ScrollbarProps {
    orientation?: SplitterOrientation;
    value: number;
    totalSize: number;
    viewportSize: number;
    onScroll: (value: number) => void;
    onDragStart?: () => void;
    onDragEnd?: () => void;
    className?: string;
    style?: CSSProperties;
}


interface ScrollbarState {
    isDragging: boolean;
    isHovered: boolean;
}


class Scrollbar extends Component<ScrollbarProps, ScrollbarState> {
    public static defaultProps = {
        orientation: SplitterOrientation.VERTICAL,
    };

    private trackRef: HTMLDivElement | null = null;
    private startPos: number = 0;
    private startValue: number = 0;

    private handleMouseEnter: () => void = (): void => {
        this.setState({ isHovered: true });
    };

    private handleMouseLeave: () => void = (): void => {
        this.setState({ isHovered: false });
    };

    private handleMouseDown: (event: MouseEvent) => void = (event: MouseEvent): void => {
        event.preventDefault();
        event.stopPropagation();
        
        const { orientation, onDragStart } = this.props;
        this.startPos = orientation === SplitterOrientation.HORIZONTAL ? event.clientX : event.clientY;
        this.startValue = this.props.value;
        
        this.setState({ isDragging: true });
        
        if (onDragStart) {
            onDragStart();
        }

        this.addListeners();
    };

    private handleMouseMove: (event: globalThis.MouseEvent) => void = (event: globalThis.MouseEvent): void => {
        if (!this.state.isDragging || !this.trackRef) return;

        const { orientation, totalSize, viewportSize, onScroll } = this.props;
        const trackSize: number = orientation === SplitterOrientation.HORIZONTAL 
            ? this.trackRef.clientWidth 
            : this.trackRef.clientHeight;
            
        // Calculate thumb size same way as in render.
        const ratio: number = viewportSize / totalSize;
        const thumbSize: number = Math.max(20, trackSize * ratio);
        const availableTrack: number = trackSize - thumbSize;
        const scrollableContent: number = totalSize - viewportSize;

        if (availableTrack <= 0 || scrollableContent <= 0) return;

        const currentPos: number = orientation === SplitterOrientation.HORIZONTAL ? event.clientX : event.clientY;
        const deltaPixels: number = currentPos - this.startPos;
        
        // Convert pixels to scroll value.
        const deltaValue: number = (deltaPixels / availableTrack) * scrollableContent;
        
        let newValue: number = this.startValue + deltaValue;
        newValue = Math.max(0, Math.min(scrollableContent, newValue));

        onScroll(newValue);
    };

    private handleMouseUp: () => void = (): void => {
        const { onDragEnd } = this.props;

        this.setState({ isDragging: false });
        
        if (onDragEnd) {
            onDragEnd();
        }

        this.removeListeners();
    };

    constructor(props: ScrollbarProps) {
        super(props);

        this.state = {
            isDragging: false,
            isHovered: false,
        };
    }

    public componentWillUnmount(): void {
        this.removeListeners();
    }

    public render(): ReactNode {
        const { orientation = SplitterOrientation.VERTICAL, value, totalSize, viewportSize, className, style } = this.props;
        const { isDragging, isHovered } = this.state;

        if (totalSize <= viewportSize || viewportSize === 0) {
            return null;
        }
        
        const ratio: number = viewportSize / totalSize;
        const maxScroll: number = totalSize - viewportSize;
        const scrollRatio: number = value / maxScroll;
        
        // Calculate visual percentages.
        const positionPercent: number = scrollRatio * (100 - (ratio * 100));
        const sizePercent: number = ratio * 100;

        return (
            <StyledScrollbarTrack
                orientation={orientation}
                className={className}
                style={style}
                trackRef={(ref) => this.trackRef = ref}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <StyledScrollbarThumb
                    orientation={orientation}
                    positionPercent={positionPercent}
                    sizePercent={sizePercent}
                    isDragging={isDragging}
                    isHovered={isHovered}
                    onMouseDown={this.handleMouseDown}
                />
            </StyledScrollbarTrack>
        );
    }

    private addListeners(): void {
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    private removeListeners(): void {
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
    }
}


export default Scrollbar;
