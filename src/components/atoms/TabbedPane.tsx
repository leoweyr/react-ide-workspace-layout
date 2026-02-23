import { Component, ReactNode, CSSProperties, MouseEvent } from 'react';

import { Theme } from '../../theme/Theme';
import { Tab } from './Tab';
import { IconName } from './enums/IconName';


export interface TabItemProps {
    id: string;
    title: string;
    icon?: IconName;
    content?: ReactNode;
    closable?: boolean;
    isModified?: boolean;
}


export interface TabbedPaneProps {
    tabs: TabItemProps[];
    activeTabId?: string;
    onTabClick?: (id: string) => void;
    onTabClose?: (id: string) => void;
    className?: string;
    style?: CSSProperties;
    contentStyle?: CSSProperties;
}


export interface TabbedPaneState {
    activeTabId: string;
}


export class TabbedPane extends Component<TabbedPaneProps, TabbedPaneState> {
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
        const theme = Theme.getInstance();

        const activeTab: TabItemProps | undefined = tabs.find((t: TabItemProps) => t.id === activeTabId);

        return (
            <div className={className} style={{ display: 'flex', flexDirection: 'column', height: '100%', ...style }}>
                <div style={{ 
                    display: 'flex', 
                    borderBottom: `1px solid ${theme.colors.border}`,
                    backgroundColor: theme.colors.panelBackground 
                }}>
                    {tabs.map((tab: TabItemProps) => (
                        <Tab
                            key={tab.id}
                            title={tab.title}
                            icon={tab.icon}
                            isActive={tab.id === activeTabId}
                            isModified={tab.isModified}
                            onClose={tab.closable ? (e: MouseEvent) => this.handleTabClose(e, tab.id) : undefined}
                            onClick={() => this.handleTabClick(tab.id)}
                        />
                    ))}
                </div>
                <div style={{ flex: 1, overflow: 'auto', backgroundColor: theme.colors.background, ...contentStyle }}>
                    {activeTab?.content}
                </div>
            </div>
        );
    }
}


export default TabbedPane;
