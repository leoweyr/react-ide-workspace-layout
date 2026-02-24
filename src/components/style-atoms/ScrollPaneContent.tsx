import { Component, ReactNode, CSSProperties, UIEvent } from 'react';


interface ScrollPaneContentProps {
    contentRef?: (instance: HTMLDivElement | null) => void;
    onScroll?: (event: UIEvent<HTMLDivElement>) => void;
    style?: CSSProperties;
    children?: ReactNode;
}


class ScrollPaneContent extends Component<ScrollPaneContentProps> {
    public render(): ReactNode {
        const { contentRef, onScroll, style, children } = this.props;

        const scrollStyle: CSSProperties = {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'scroll',
            scrollbarWidth: 'none',  // Firefox.
            msOverflowStyle: 'none',  // IE/Edge.
            ...style,
        };

        return (
            <div
                ref={contentRef}
                onScroll={onScroll}
                style={scrollStyle}
                className="scroll-pane-content"
            >
                {/* Hide Webkit scrollbar. */}
                <style>
                    {`
                        .scroll-pane-content::-webkit-scrollbar {
                            display: none;
                        }
                    `}
                </style>
                <div style={{ minWidth: '100%', minHeight: '100%', display: 'inline-block' }}>
                    {children}
                </div>
            </div>
        );
    }
}


export default ScrollPaneContent;
