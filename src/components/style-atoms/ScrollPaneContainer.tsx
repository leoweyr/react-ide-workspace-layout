import { Component, ReactNode, CSSProperties } from 'react';

import { Theme } from '../../theme/Theme';


interface ScrollPaneContainerProps {
    className?: string;
    style?: CSSProperties;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    children?: ReactNode;
}


class ScrollPaneContainer extends Component<ScrollPaneContainerProps> {
    public render(): ReactNode {
        const { className, style, onMouseEnter, onMouseLeave, children } = this.props;
        const theme = Theme.getInstance();

        const containerStyle: CSSProperties = {
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: theme.colors.background,
            ...style,
        };

        return (
            <div
                className={className}
                style={containerStyle}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {children}
            </div>
        );
    }
}


export default ScrollPaneContainer;
