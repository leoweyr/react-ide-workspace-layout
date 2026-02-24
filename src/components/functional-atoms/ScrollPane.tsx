import { Component, ReactNode, CSSProperties, UIEvent } from 'react';

import Scrollbar from './Scrollbar';
import { SplitterOrientation } from '../style-atoms/enums/SplitterOrientation';
import StyledScrollPaneContainer from '../style-atoms/ScrollPaneContainer';
import StyledScrollPaneContent from '../style-atoms/ScrollPaneContent';


interface ScrollPaneProps {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    contentStyle?: CSSProperties;
}


interface ScrollPaneState {
    scrollTop: number;
    scrollLeft: number;
    scrollHeight: number;
    scrollWidth: number;
    clientHeight: number;
    clientWidth: number;
    isHovered: boolean;
    isDragging: boolean;
}


class ScrollPane extends Component<ScrollPaneProps, ScrollPaneState> {
    private contentRef: HTMLDivElement | null = null;
    private resizeObserver: ResizeObserver | null = null;

    private handleScroll: (event: UIEvent<HTMLDivElement>) => void = (event: UIEvent<HTMLDivElement>): void => {
        const target: HTMLDivElement = event.target as HTMLDivElement;
        this.setState({
            scrollTop: target.scrollTop,
            scrollLeft: target.scrollLeft,
            scrollHeight: target.scrollHeight,
            scrollWidth: target.scrollWidth,
            clientHeight: target.clientHeight,
            clientWidth: target.clientWidth,
        });
    };

    private handleVerticalScroll: (value: number) => void = (value: number): void => {
        if (this.contentRef) {
            this.contentRef.scrollTop = value;
        }
    };

    private handleHorizontalScroll: (value: number) => void = (value: number): void => {
        if (this.contentRef) {
            this.contentRef.scrollLeft = value;
        }
    };

    private handleMouseEnter: () => void = (): void => {
        this.setState({ isHovered: true });
    };

    private handleMouseLeave: () => void = (): void => {
        this.setState({ isHovered: false });
    };

    private handleDragStart: () => void = (): void => {
        this.setState({ isDragging: true });
    };

    private handleDragEnd: () => void = (): void => {
        this.setState({ isDragging: false });
    };

    private updateDimensions: () => void = (): void => {
        if (this.contentRef) {
            this.setState({
                scrollHeight: this.contentRef.scrollHeight,
                scrollWidth: this.contentRef.scrollWidth,
                clientHeight: this.contentRef.clientHeight,
                clientWidth: this.contentRef.clientWidth,
                scrollTop: this.contentRef.scrollTop,
                scrollLeft: this.contentRef.scrollLeft,
            });
        }
    };

    constructor(props: ScrollPaneProps) {
        super(props);

        this.state = {
            scrollTop: 0,
            scrollLeft: 0,
            scrollHeight: 0,
            scrollWidth: 0,
            clientHeight: 0,
            clientWidth: 0,
            isHovered: false,
            isDragging: false,
        };
    }

    public componentDidMount(): void {
        this.updateDimensions();
        if (this.contentRef) {
            this.resizeObserver = new ResizeObserver(() => {
                this.updateDimensions();
            });
            this.resizeObserver.observe(this.contentRef);
        }
    }

    public componentWillUnmount(): void {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }

    public render(): ReactNode {
        const { children, className, style, contentStyle } = this.props;
        const { 
            scrollTop, 
            scrollLeft, 
            scrollHeight, 
            scrollWidth, 
            clientHeight, 
            clientWidth, 
            isHovered,
            isDragging
        } = this.state;

        const showVertical: boolean = scrollHeight > clientHeight;
        const showHorizontal: boolean = scrollWidth > clientWidth;

        return (
            <StyledScrollPaneContainer
                className={className}
                style={style}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <StyledScrollPaneContent
                    contentRef={(ref) => this.contentRef = ref}
                    onScroll={this.handleScroll}
                    style={contentStyle}
                >
                    {children}
                </StyledScrollPaneContent>

                {showVertical && (
                    <Scrollbar
                        orientation={SplitterOrientation.VERTICAL}
                        value={scrollTop}
                        totalSize={scrollHeight}
                        viewportSize={clientHeight}
                        onScroll={this.handleVerticalScroll}
                        onDragStart={this.handleDragStart}
                        onDragEnd={this.handleDragEnd}
                        style={{
                            opacity: isHovered || isDragging ? 1 : 0,
                            transition: 'opacity 0.2s',
                        }}
                    />
                )}

                {showHorizontal && (
                    <Scrollbar
                        orientation={SplitterOrientation.HORIZONTAL}
                        value={scrollLeft}
                        totalSize={scrollWidth}
                        viewportSize={clientWidth}
                        onScroll={this.handleHorizontalScroll}
                        onDragStart={this.handleDragStart}
                        onDragEnd={this.handleDragEnd}
                        style={{
                            opacity: isHovered || isDragging ? 1 : 0,
                            transition: 'opacity 0.2s',
                        }}
                    />
                )}
            </StyledScrollPaneContainer>
        );
    }
}


export default ScrollPane;
