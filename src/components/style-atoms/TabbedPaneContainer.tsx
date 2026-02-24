import { Component, ReactNode, CSSProperties } from 'react';


interface TabbedPaneContainerProps {
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
}


class TabbedPaneContainer extends Component<TabbedPaneContainerProps> {
    public render(): ReactNode {
        const { className, style, children } = this.props;

        const containerStyle: CSSProperties = {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            ...style,
        };

        return (
            <div className={className} style={containerStyle}>
                {children}
            </div>
        );
    }
}


export default TabbedPaneContainer;
