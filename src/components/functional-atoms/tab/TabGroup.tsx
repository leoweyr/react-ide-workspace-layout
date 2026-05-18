import { ReactElement, CSSProperties, Component, MouseEvent as ReactMouseEvent, ReactNode, cloneElement } from 'react';

import Tab from './Tab';


interface TabGroupProps {
    tabs: Map<string, ReactElement<any, typeof Tab>>;
    isFocused?: boolean;
    className?: string;
    style?: CSSProperties;
}


interface TabGroupState {
    tabs: Map<string, ReactElement<any, typeof Tab>>;
    focusedTabKey: string | null;
}


class TabGroup extends Component<TabGroupProps, TabGroupState> {
    private handleTabSelect: (key: string, originalOnClick?: (event: ReactMouseEvent) => void) => (event: ReactMouseEvent) => void = (key: string, originalOnClick?: (event: ReactMouseEvent) => void) => (event: ReactMouseEvent): void => {
        this.setState({ focusedTabKey: key });

        if (originalOnClick) {
            originalOnClick(event);
        }
    };

    private handleTabClose: (key: string, originalOnClose?: (event: ReactMouseEvent) => void) => (event: ReactMouseEvent) => void = (key: string, originalOnClose?: (event: ReactMouseEvent) => void) => (event: ReactMouseEvent): void => {
        event.stopPropagation();

        this.setState((prevState: TabGroupState): TabGroupState => {
            const newTabs = new Map(prevState.tabs);
            const keys: string[] = Array.from(newTabs.keys());
            const index: number = keys.indexOf(key);

            newTabs.delete(key);

            let newFocusedKey: string | null = prevState.focusedTabKey;

            if (newFocusedKey === key) {
                if (index > 0) {
                    newFocusedKey = keys[index - 1];
                } else if (index < keys.length - 1) {
                    newFocusedKey = keys[index + 1];
                } else {
                    newFocusedKey = null;
                }
            }

            return {
                tabs: newTabs,
                focusedTabKey: newFocusedKey
            };
        }, (): void => {
            if (originalOnClose) {
                originalOnClose(event);
            }
        });
    };

    constructor(props: TabGroupProps) {
        super(props);

        const initialTabs = new Map(props.tabs);
        const firstKey: string | null = initialTabs.keys().next().value || null;

        this.state = {
            tabs: initialTabs,
            focusedTabKey: firstKey,
        };
    }

    public render(): ReactNode {
        const { isFocused = true, className, style } = this.props;
        const { tabs, focusedTabKey } = this.state;

        const renderedTabs: ReactNode[] = [];

        tabs.forEach((tabElement: ReactElement<any, typeof Tab>, key: string) => {
            const isTabActive: boolean = key === focusedTabKey;

            const clonedTab: ReactElement = cloneElement(tabElement, {
                key: key,
                isActive: isTabActive,
                isFocused: isTabActive ? isFocused : false,
                onClick: this.handleTabSelect(key, tabElement.props.onClick),
                onClose: this.handleTabClose(key, tabElement.props.onClose)
            });

            renderedTabs.push(clonedTab);
        });

        return (
            <div className={className} style={this.getContainerStyles(style)}>
                {renderedTabs}
            </div>
        );
    }

    public componentDidUpdate(prevProps: TabGroupProps): void {
        if (prevProps.tabs !== this.props.tabs) {
            const newTabs = new Map(this.props.tabs);

            this.setState((prevState: TabGroupState): TabGroupState => {
                let newFocusedKey: string | null = prevState.focusedTabKey;

                if (newFocusedKey && !newTabs.has(newFocusedKey)) {
                    newFocusedKey = newTabs.keys().next().value || null;
                } else if (!newFocusedKey && newTabs.size > 0) {
                    newFocusedKey = newTabs.keys().next().value || null;
                }

                return {
                    tabs: newTabs,
                    focusedTabKey: newFocusedKey
                };
            });
        }
    }

    private getContainerStyles(customStyle?: CSSProperties): CSSProperties {
        return {
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'nowrap',
            ...customStyle,
        };
    }

    /**
     * Dynamically adds a new tab to the group and focuses it.
     */
    public addTab(key: string, tabElement: ReactElement<any, typeof Tab>): void {
        this.setState((prevState: TabGroupState): TabGroupState => {
            const newTabs = new Map(prevState.tabs);
            newTabs.set(key, tabElement);

            return {
                tabs: newTabs,
                focusedTabKey: key  // Focusing is activated immediately upon adding a new item by default.
            };
        });
    }

    public getFocusedTabKey(): string | null {
        return this.state.focusedTabKey;
    }
}


export default TabGroup;
