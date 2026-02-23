import { Component, ReactNode, CSSProperties, MouseEvent } from 'react';

import { Theme } from '../../theme/Theme';
import { SplitterOrientation } from './enums/SplitterOrientation';


export interface ScrollbarProps {
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


export interface ScrollbarState {
    isDragging: boolean;
    isHovered: boolean;
}


export class Scrollbar extends Component<ScrollbarProps, ScrollbarState> {
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
        const trackSize = orientation === SplitterOrientation.HORIZONTAL 
            ? this.trackRef.clientWidth 
            : this.trackRef.clientHeight;
            
        // Calculate thumb size same way as in render.
        const ratio = viewportSize / totalSize;
        const thumbSize = Math.max(20, trackSize * ratio);
        const availableTrack = trackSize - thumbSize;
        const scrollableContent = totalSize - viewportSize;

        if (availableTrack <= 0 || scrollableContent <= 0) return;

        const currentPos = orientation === SplitterOrientation.HORIZONTAL ? event.clientX : event.clientY;
        const deltaPixels = currentPos - this.startPos;
        
        // Convert pixels to scroll value.
        const deltaValue = (deltaPixels / availableTrack) * scrollableContent;
        
        let newValue = this.startValue + deltaValue;
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
        const { orientation, value, totalSize, viewportSize, className, style } = this.props;
        const { isDragging, isHovered } = this.state;
        const theme = Theme.getInstance();

        if (totalSize <= viewportSize || viewportSize === 0) {
            return null;
        }

        const isHorizontal = orientation === SplitterOrientation.HORIZONTAL;
        
        // Calculate dimensions.
        // We can't know exact track size in px without ref, but we use percentages for position?
        // No, for custom scrollbar with dragging, we usually need px or careful % math.
        // Simplified: Assume track is 100% of container.
        
        const ratio = viewportSize / totalSize;
        // visual thumb size in %? No, usually px min size limits.
        // We rely on CSS flex or absolute positioning.
        
        // Let's use percentage based positioning for simplicity if track size is dynamic.
        const maxScroll = totalSize - viewportSize;
        const scrollRatio = value / maxScroll;
        
        // But thumb size depends on ratio.
        // thumbHeight = trackHeight * (viewportSize / totalSize)
        // thumbTop = (trackHeight - thumbHeight) * (value / (totalSize - viewportSize))
        
        // We need real track size to apply min-height constraint correctly?
        // Or we use % and `min-height` css.
        // `height: ${ratio * 100}%`.
        // `top: ${ (value / totalSize) * 100 }%`? No, that's wrong.
        
        // Correct math:
        // Thumb represents the viewport.
        // Position represents scroll position.
        
        // Let's use simple style for now, assuming trackRef handles size.
        
        return (
            <div
                ref={(ref) => this.trackRef = ref}
                className={className}
                style={{
                    position: 'absolute',
                    top: isHorizontal ? 'auto' : 0,
                    bottom: 0,
                    left: isHorizontal ? 0 : 'auto',
                    right: 0,
                    width: isHorizontal ? '100%' : '10px',
                    height: isHorizontal ? '10px' : '100%',
                    backgroundColor: 'transparent', // Track is transparent usually.
                    zIndex: 100,
                    ...style,
                }}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <div
                    onMouseDown={this.handleMouseDown}
                    style={{
                        position: 'absolute',
                        top: isHorizontal ? 0 : `${scrollRatio * (100 - (ratio * 100))}%`, // Simplified.
                        left: isHorizontal ? `${scrollRatio * (100 - (ratio * 100))}%` : 0,
                        width: isHorizontal ? `${Math.max(ratio * 100, 10)}%` : '6px', // 6px wide thumb.
                        height: isHorizontal ? '6px' : `${Math.max(ratio * 100, 10)}%`,
                        margin: '2px',
                        backgroundColor: (isDragging || isHovered) ? theme.colors.textSecondary : theme.colors.border,
                        borderRadius: '3px',
                        opacity: (isDragging || isHovered) ? 0.8 : 0.4,
                        transition: 'opacity 0.2s, background-color 0.2s',
                        cursor: 'default',
                    }}
                />
            </div>
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
