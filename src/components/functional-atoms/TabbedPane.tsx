import { Component, ReactNode, CSSProperties, MouseEvent } from 'react';

import Tab from './Tab';
import { IconName } from '../style-atoms/enums/IconName';
import StyledTabbedPaneContainer from '../style-atoms/TabbedPaneContainer';
import StyledTabbedPaneContent from '../style-atoms/TabbedPaneContent';
import StyledTabbedPaneHeader from '../style-atoms/TabbedPaneHeader';


export interface TabItemProps {
    id: string;
    title: string;
    icon?: IconName;
    content?: ReactNode;
    closable?: boolean;
    isModified?: boolean;
}


interface TabbedPaneProps {
    tabs: TabItemProps[];
    activeTabId?: string;
    onTabClick?: (id: string) => void;
    onTabClose?: (id: string) => void;
    className?: string;
    style?: CSSProperties;
    contentStyle?: CSSProperties;
}


interface TabbedPaneState {
    activeTabId: string;
}


class TabbedPane extends Component<TabbedPaneProps, TabbedPaneState> {
    constructor(props: TabbedPaneProps) {
        super(props);

        this.state = {
            activeTabId: props.activeTabId || (props.tabs.length > 0 ? props.tabs[0].id : ''),
        };
    }

    public componentDidUpdate(prevProps: TabbedPaneProps): void {
        if (prevProps.activeTabId !== this.props.activeTabId && this.props.activeTabId !== undefined) {
            this.setState({ activeTabId: this.props.activeTabId });
        }
    }

    private handleTabClick: (id: string) => void = (id: string): void => {
        if (this.props.onTabClick) {
            this.props.onTabClick(id);
        } else {
            this.setState({ activeTabId: id });
        }
    };

    private handleTabClose: (event: MouseEvent, id: string) => void = (event: MouseEvent, id: string): void => {
        event.stopPropagation();
        if (this.props.onTabClose) {
            this.props.onTabClose(id);
        }
    };

    public render(): ReactNode {
        const { tabs, className, style, contentStyle } = this.props;
        const { activeTabId } = this.state;

        const activeTab: TabItemProps | undefined = tabs.find((t: TabItemProps) => t.id === activeTabId);

        return (
            <StyledTabbedPaneContainer className={className} style={style}>
                <StyledTabbedPaneHeader>
                    {tabs.map((tab: TabItemProps) => (
                        <Tab
                            key={tab.id}
                            title={tab.title}
                            icon={tab.icon}
                            isActive={tab.id === activeTabId}
                            isModified={tab.isModified}
                            onClose={tab.closable ? (e: MouseEvent): void => this.handleTabClose(e, tab.id) : undefined}
                            onClick={() => this.handleTabClick(tab.id)}
                        />
                    ))}
                </StyledTabbedPaneHeader>
                <StyledTabbedPaneContent style={contentStyle}>
                    {activeTab?.content}
                </StyledTabbedPaneContent>
            </StyledTabbedPaneContainer>
        );
    }
}


export default TabbedPane;
