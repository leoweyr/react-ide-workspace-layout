import { MouseEvent, CSSProperties, Component, ReactNode } from 'react';

import { IconName } from '../style-atoms/enums/IconName';
import StyledTab from '../style-atoms/Tab';


interface TabProps {
    title: string;
    isActive?: boolean;
    isModified?: boolean;
    icon?: IconName;
    onClose?: (event: MouseEvent) => void;
    onClick?: (event: MouseEvent) => void;
    className?: string;
    style?: CSSProperties;
}


interface TabState {
    isHovered: boolean;
    isCloseHovered: boolean;
}


class Tab extends Component<TabProps, TabState> {
    private handleMouseEnter: () => void = (): void => {
        this.setState({ isHovered: true });
    };

    private handleMouseLeave: () => void = (): void => {
        this.setState({ isHovered: false });
    };

    private handleCloseMouseEnter: (event: MouseEvent) => void = (event: MouseEvent): void => {
        event.stopPropagation();
        this.setState({ isCloseHovered: true });
    };

    private handleCloseMouseLeave: (event: MouseEvent) => void = (event: MouseEvent): void => {
        event.stopPropagation();
        this.setState({ isCloseHovered: false });
    };

    constructor(props: TabProps) {
        super(props);

        this.state = {
            isHovered: false,
            isCloseHovered: false,
        };
    }

    public render(): ReactNode {
        const { title, icon, isActive, isModified, onClose, onClick, className, style } = this.props;
        const { isHovered, isCloseHovered } = this.state;

        return (
            <StyledTab
                title={title}
                icon={icon}
                isActive={isActive}
                isModified={isModified}
                isHovered={isHovered}
                isCloseHovered={isCloseHovered}
                onClose={onClose}
                onClick={onClick}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onCloseMouseEnter={this.handleCloseMouseEnter}
                onCloseMouseLeave={this.handleCloseMouseLeave}
                className={className}
                style={style}
            />
        );
    }
}


export default Tab;
