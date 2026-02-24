import { Component, ReactNode, CSSProperties } from 'react';


interface SplitterPaneProps {
    size?: string;  // Flex basis or flex grow.
    isFlexible?: boolean;  // If true, flex: 1, else flex: 0 0 size.
    children?: ReactNode;
}


class SplitterPane extends Component<SplitterPaneProps> {
    public render(): ReactNode {
        const { size, isFlexible, children } = this.props;

        const paneStyle: CSSProperties = {
            flex: isFlexible ? 1 : `0 0 ${size}`,
            overflow: 'auto',
        };

        return (
            <div style={paneStyle}>
                {children}
            </div>
        );
    }
}


export default SplitterPane;
