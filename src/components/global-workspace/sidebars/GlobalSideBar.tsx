import {
    Component,
    ReactElement,
    CSSProperties,
    createRef,
    ReactNode,
    MouseEvent as ReactMouseEvent,
    cloneElement,
    RefObject
} from 'react';

import { IconButton } from '../../functional-atoms';
import { Theme } from '../../../features';
import { 
    Toolbar, 
    Orientation, 
    Size 
} from '../../style-atoms';
import { 
    UIGroupPool, 
    UIGroupItem 
} from '../../../features';
import { SideBarSection } from './enums/SideBarSection';
import { ExtensionDirection } from '../../style-atoms/enums/ExtensionDirection';
import { SideBarDragSession, SideBarDragListener } from './interfaces/SideBarDragSession';


interface GlobalSideBarProps {
    topAboveActions?: ReactElement<any, typeof IconButton>[];
    topBelowActions?: ReactElement<any, typeof IconButton>[];
    bottomActions?: ReactElement<any, typeof IconButton>[];
    topAboveActionsGroupId?: string;
    topBelowActionsGroupId?: string;
    bottomActionsGroupId?: string;
    dragDetectionDirection?: ExtensionDirection;
    topDragDetectionWidth?: number;
    bottomDragDetectionWidth?: number;
    className?: string;
    style?: CSSProperties;
}


interface GlobalSideBarState {
    topAboveActions: ReactElement<any, typeof IconButton>[];
    topBelowActions: ReactElement<any, typeof IconButton>[];
    bottomActions: ReactElement<any, typeof IconButton>[];
    dragSession: SideBarDragSession | null;
}


class GlobalSideBar extends Component<GlobalSideBarProps, GlobalSideBarState> {
    private static dragSession: SideBarDragSession | null = null;
    private static dragListeners: Set<SideBarDragListener> = new Set();
    private static instances: Set<GlobalSideBar> = new Set();

    public static subscribeToDrag(listener: SideBarDragListener): void {
        this.dragListeners.add(listener);
    }

    public static unsubscribeFromDrag(listener: SideBarDragListener): void {
        this.dragListeners.delete(listener);
    }

    private static notifyDragUpdate(): void {
        this.dragListeners.forEach((listener: SideBarDragListener): void => listener(this.dragSession));
        this.instances.forEach((instance: GlobalSideBar): void => instance.setState({ dragSession: this.dragSession }));
    }

    private topAboveGroupRef = createRef<HTMLDivElement>();
    private topBelowGroupRef = createRef<HTMLDivElement>();
    private bottomGroupRef = createRef<HTMLDivElement>();
    private toolbarRef = createRef<HTMLDivElement>();
    private dragTimer: number | undefined;
    private gap: number = Theme.getInstance().layout.spacing.large;

    private handleMouseDown: (group: SideBarSection, index: number, event: ReactMouseEvent) => void = (group: SideBarSection, index: number, event: ReactMouseEvent): void => {
        if (event.button !== 0 || GlobalSideBar.dragSession) {
            return;
        }

        // Measure the actual IconButton (the first child of the wrapper div).
        const targetElement: HTMLElement = event.currentTarget.firstElementChild as HTMLElement;

        if (!targetElement) {
            return;
        }

        const rect: DOMRect = targetElement.getBoundingClientRect();
        const offsetX: number = event.clientX - rect.left;
        const offsetY: number = event.clientY - rect.top;
        const width: number = rect.width;
        const height: number = rect.height;
        const x: number = event.clientX;
        const y: number = event.clientY;

        let draggedElement: ReactElement<any, typeof IconButton>;
        let sourceGroupId: string | undefined;

        if (group === SideBarSection.TOP_ABOVE) {
            draggedElement = this.state.topAboveActions[index];
            sourceGroupId = this.props.topAboveActionsGroupId;
        } else if (group === SideBarSection.TOP_BELOW) {
            draggedElement = this.state.topBelowActions[index];
            sourceGroupId = this.props.topBelowActionsGroupId;
        } else {
            draggedElement = this.state.bottomActions[index];
            sourceGroupId = this.props.bottomActionsGroupId;
        }

        if (!sourceGroupId) {
            return;
        }

        const pool: UIGroupPool = UIGroupPool.getInstance();
        const item: UIGroupItem | undefined = pool.getItems(sourceGroupId)[index];

        if (!item) {
            return;
        }

        this.dragTimer = window.setTimeout((): void => {
            GlobalSideBar.dragSession = {
                draggedItem: item,
                draggedElement,
                sourceGroupId,
                sourceIndex: index,
                mousePos: { x, y },
                dragOffset: { x: offsetX, y: offsetY },
                draggedSize: { width, height },
                dropTarget: this.calculateDropTarget(x, y),
            };

            GlobalSideBar.notifyDragUpdate();
        }, 500);
    };

    private handleWindowMouseMove: (event: MouseEvent) => void = (event: MouseEvent): void => {
        if (GlobalSideBar.dragSession) {
            const session: SideBarDragSession = GlobalSideBar.dragSession;
            session.mousePos = { x: event.clientX, y: event.clientY };
            
            // Perform hit testing across all instances.
            let foundTarget: { targetGroupId: string, targetIndex: number } | null = null;

            for (const instance of GlobalSideBar.instances) {
                const target = instance.calculateDropTarget(event.clientX, event.clientY);

                if (target) {
                    foundTarget = target;
                    break;
                }
            }

            // Strictly follow the detection zones: if no direct hit, clear the target.
            session.dropTarget = foundTarget;

            GlobalSideBar.notifyDragUpdate();
        }
    };

    private handleWindowMouseUp: () => void = (): void => {
        if (this.dragTimer) {
            window.clearTimeout(this.dragTimer);
            this.dragTimer = undefined;
        }

        if (GlobalSideBar.dragSession) {
            const session: SideBarDragSession = GlobalSideBar.dragSession;

            if (session.dropTarget) {
                UIGroupPool.getInstance().moveItem(
                    session.sourceGroupId,
                    session.dropTarget.targetGroupId,
                    session.sourceIndex,
                    session.dropTarget.targetIndex
                );
            }

            GlobalSideBar.dragSession = null;
            GlobalSideBar.notifyDragUpdate();
        }
    };

    private handleTopAboveGroupUpdate: (items: UIGroupItem[]) => void = (items: UIGroupItem[]): void => {
        this.setState({ topAboveActions: items.map((item: UIGroupItem) => item.element as ReactElement<any, typeof IconButton>) });
    };

    private handleTopBelowGroupUpdate: (items: UIGroupItem[]) => void = (items: UIGroupItem[]): void => {
        this.setState({ topBelowActions: items.map((item: UIGroupItem) => item.element as ReactElement<any, typeof IconButton>) });
    };

    private handleBottomGroupUpdate: (items: UIGroupItem[]) => void = (items: UIGroupItem[]): void => {
        this.setState({ bottomActions: items.map((item: UIGroupItem) => item.element as ReactElement<any, typeof IconButton>) });
    };

    private calculateDropTarget: (mouseX: number, mouseY: number) => { targetGroupId: string, targetIndex: number } | null = (mouseX: number, mouseY: number): { targetGroupId: string, targetIndex: number } | null => {
        if (!this.toolbarRef.current) {
            return null;
        }

        const toolbarRect: DOMRect = this.toolbarRef.current.getBoundingClientRect();
        const bottomRect: DOMRect | undefined = this.bottomGroupRef.current?.getBoundingClientRect();

        const midToolbarY: number = toolbarRect.top + toolbarRect.height / 2;
        const bottomSectionTop: number = (bottomRect && bottomRect.height > 0) ? bottomRect.top : midToolbarY + 50;

        // 1. Check if we are in the bottom section.
        if (this.props.bottomActionsGroupId && this.isMouseInBottomDragDetectionZone(mouseX, mouseY, bottomSectionTop)) {
            const result = this.calculateIndexInGroup(this.bottomGroupRef.current!, mouseY, SideBarSection.BOTTOM);
            return { targetGroupId: this.props.bottomActionsGroupId, targetIndex: result.index };
        }

        // 2. We are in the top half. Split between TopAbove and TopBelow.
        if (this.isMouseInTopDragDetectionZone(mouseX, mouseY, bottomSectionTop)) {
            // Split between TopAbove and TopBelow within the top zone.
            if (this.props.topAboveActionsGroupId && this.props.topBelowActionsGroupId) {
                const topAboveRect: DOMRect | undefined = this.topAboveGroupRef.current?.getBoundingClientRect();
                const topBelowRect: DOMRect | undefined = this.topBelowGroupRef.current?.getBoundingClientRect();

                const topAboveBottom: number = topAboveRect ? topAboveRect.bottom : toolbarRect.top;
                const topBelowTop: number = (topBelowRect && topBelowRect.height > 0) ? topBelowRect.top : topAboveBottom + 20;
                const separatorMidY: number = (topAboveBottom + topBelowTop) / 2;

                if (mouseY < separatorMidY) {
                    const result = this.calculateIndexInGroup(this.topAboveGroupRef.current!, mouseY, SideBarSection.TOP_ABOVE);
                    return { targetGroupId: this.props.topAboveActionsGroupId, targetIndex: result.index };
                } else {
                    const result = this.calculateIndexInGroup(this.topBelowGroupRef.current!, mouseY, SideBarSection.TOP_BELOW);
                    return { targetGroupId: this.props.topBelowActionsGroupId, targetIndex: result.index };
                }
            }

            // Fallbacks if only one top group exists.
            if (this.props.topAboveActionsGroupId) {
                const result = this.calculateIndexInGroup(this.topAboveGroupRef.current!, mouseY, SideBarSection.TOP_ABOVE);
                return { targetGroupId: this.props.topAboveActionsGroupId, targetIndex: result.index };
            }

            if (this.props.topBelowActionsGroupId) {
                const result = this.calculateIndexInGroup(this.topBelowGroupRef.current!, mouseY, SideBarSection.TOP_BELOW);
                return { targetGroupId: this.props.topBelowActionsGroupId, targetIndex: result.index };
            }
        }

        return null;
    };

    constructor(props: GlobalSideBarProps) {
        super(props);

        this.state = {
            topAboveActions: props.topAboveActions || [],
            topBelowActions: props.topBelowActions || [],
            bottomActions: props.bottomActions || [],
            dragSession: GlobalSideBar.dragSession,
        };

        if (props.topAboveActionsGroupId && props.topAboveActions) {
            this.syncActionsToPool(props.topAboveActionsGroupId, props.topAboveActions);
        }

        if (props.topBelowActionsGroupId && props.topBelowActions) {
            this.syncActionsToPool(props.topBelowActionsGroupId, props.topBelowActions);
        }

        if (props.bottomActionsGroupId && props.bottomActions) {
            this.syncActionsToPool(props.bottomActionsGroupId, props.bottomActions);
        }
    }

    public render(): ReactNode {
        const { className, style }: GlobalSideBarProps = this.props;

        return (
            <Toolbar
                innerRef={this.toolbarRef}
                orientation={Orientation.VERTICAL}
                thickness={39}
                gap={this.gap}
                padding={5.75}
                className={className}
                style={{ ...style, position: 'relative' }}
            >
                <div style={this.getGroupContainerStyles()}>
                    <div ref={this.topAboveGroupRef} style={this.getGroupContainerStyles()}>
                        {this.renderGroup(SideBarSection.TOP_ABOVE)}
                    </div>
                    
                    {this.renderSeparator()}
                    
                    <div ref={this.topBelowGroupRef} style={this.getGroupContainerStyles()}>
                        {this.renderGroup(SideBarSection.TOP_BELOW)}
                    </div>
                </div>

                <div style={{ flex: 1 }} />

                <div ref={this.bottomGroupRef} style={this.getGroupContainerStyles()}>
                    {this.renderGroup(SideBarSection.BOTTOM)}
                </div>
            </Toolbar>
        );
    }

    public componentDidUpdate(prevProps: GlobalSideBarProps): void {
        if (prevProps.topAboveActions !== this.props.topAboveActions || 
            prevProps.topBelowActions !== this.props.topBelowActions || 
            prevProps.bottomActions !== this.props.bottomActions) {
            
            if (!this.props.topAboveActionsGroupId) {
                this.setState({ topAboveActions: this.props.topAboveActions || [] });
            }

            if (!this.props.topBelowActionsGroupId) {
                this.setState({ topBelowActions: this.props.topBelowActions || [] });
            }

            if (!this.props.bottomActionsGroupId) {
                this.setState({ bottomActions: this.props.bottomActions || [] });
            }
        }

        if (prevProps.topAboveActionsGroupId !== this.props.topAboveActionsGroupId) {
            if (prevProps.topAboveActionsGroupId) {
                UIGroupPool.getInstance().unsubscribe(prevProps.topAboveActionsGroupId, this.handleTopAboveGroupUpdate);
            }

            if (this.props.topAboveActionsGroupId) {
                this.subscribeToGroup(this.props.topAboveActionsGroupId, SideBarSection.TOP_ABOVE);
            }
        }

        if (prevProps.topBelowActionsGroupId !== this.props.topBelowActionsGroupId) {
            if (prevProps.topBelowActionsGroupId) {
                UIGroupPool.getInstance().unsubscribe(prevProps.topBelowActionsGroupId, this.handleTopBelowGroupUpdate);
            }

            if (this.props.topBelowActionsGroupId) {
                this.subscribeToGroup(this.props.topBelowActionsGroupId, SideBarSection.TOP_BELOW);
            }
        }

        if (prevProps.bottomActionsGroupId !== this.props.bottomActionsGroupId) {
            if (prevProps.bottomActionsGroupId) {
                UIGroupPool.getInstance().unsubscribe(prevProps.bottomActionsGroupId, this.handleBottomGroupUpdate);
            }

            if (this.props.bottomActionsGroupId) {
                this.subscribeToGroup(this.props.bottomActionsGroupId, SideBarSection.BOTTOM);
            }
        }
    }

    public componentDidMount(): void {
        window.addEventListener('mousemove', this.handleWindowMouseMove);
        window.addEventListener('mouseup', this.handleWindowMouseUp);

        GlobalSideBar.instances.add(this);

        if (this.props.topAboveActionsGroupId) {
            this.subscribeToGroup(this.props.topAboveActionsGroupId, SideBarSection.TOP_ABOVE);
        }

        if (this.props.topBelowActionsGroupId) {
            this.subscribeToGroup(this.props.topBelowActionsGroupId, SideBarSection.TOP_BELOW);
        }

        if (this.props.bottomActionsGroupId) {
            this.subscribeToGroup(this.props.bottomActionsGroupId, SideBarSection.BOTTOM);
        }
    }

    public componentWillUnmount(): void {
        window.removeEventListener('mousemove', this.handleWindowMouseMove);
        window.removeEventListener('mouseup', this.handleWindowMouseUp);
        
        GlobalSideBar.instances.delete(this);

        if (this.dragTimer) {
            window.clearTimeout(this.dragTimer);
        }

        if (this.props.topAboveActionsGroupId) {
            UIGroupPool.getInstance().unsubscribe(this.props.topAboveActionsGroupId, this.handleTopAboveGroupUpdate);
        }

        if (this.props.topBelowActionsGroupId) {
            UIGroupPool.getInstance().unsubscribe(this.props.topBelowActionsGroupId, this.handleTopBelowGroupUpdate);
        }

        if (this.props.bottomActionsGroupId) {
            UIGroupPool.getInstance().unsubscribe(this.props.bottomActionsGroupId, this.handleBottomGroupUpdate);
        }
    }

    private syncActionsToPool(groupId: string, actions: ReactElement[]): void {
        const pool: UIGroupPool = UIGroupPool.getInstance();
        const currentItems: UIGroupItem[] = pool.getItems(groupId);

        if (currentItems.length === 0) {
            const items: UIGroupItem[] = actions.map((action: ReactElement): UIGroupItem => ({
                id: (action.key as string) || Math.random().toString(),
                element: action
            }));

            pool.setItems(groupId, items);
        }
    }

    private subscribeToGroup(groupId: string, section: SideBarSection): void {
        const pool: UIGroupPool = UIGroupPool.getInstance();

        if (section === SideBarSection.TOP_ABOVE) {
            pool.subscribe(groupId, this.handleTopAboveGroupUpdate);
            this.setState({ topAboveActions: pool.getItems(groupId).map((item: UIGroupItem) => item.element as ReactElement<any, typeof IconButton>) });
        } else if (section === SideBarSection.TOP_BELOW) {
            pool.subscribe(groupId, this.handleTopBelowGroupUpdate);
            this.setState({ topBelowActions: pool.getItems(groupId).map((item: UIGroupItem) => item.element as ReactElement<any, typeof IconButton>) });
        } else {
            pool.subscribe(groupId, this.handleBottomGroupUpdate);
            this.setState({ bottomActions: pool.getItems(groupId).map((item: UIGroupItem) => item.element as ReactElement<any, typeof IconButton>) });
        }
    }

    private isInTopDragDetectionArea(): boolean {
        const { dragSession }: GlobalSideBarState = this.state;
        if (!dragSession || !this.toolbarRef.current) {
            return false;
        }

        const toolbarRect: DOMRect = this.toolbarRef.current.getBoundingClientRect();
        const bottomRect: DOMRect | undefined = this.bottomGroupRef.current?.getBoundingClientRect();

        const midToolbarY: number = toolbarRect.top + toolbarRect.height / 2;
        const bottomSectionTop: number = (bottomRect && bottomRect.height > 0) ? bottomRect.top : midToolbarY + 50;
        
        return this.isMouseInTopDragDetectionZone(dragSession.mousePos.x, dragSession.mousePos.y, bottomSectionTop);
    }

    private isMouseInTopDragDetectionZone(x: number, y: number, bottomSectionTop: number): boolean {
        if (!this.toolbarRef.current) {
            return false;
        }

        const { dragDetectionDirection, topDragDetectionWidth = 40 } = this.props;
        const toolbarRect: DOMRect = this.toolbarRef.current.getBoundingClientRect();

        // Vertical check for Top Zone.
        if (y < toolbarRect.top || y >= bottomSectionTop) {
            return false;
        }

        // Horizontal check.
        if (dragDetectionDirection === ExtensionDirection.RIGHT) {
            return x >= toolbarRect.left && x <= toolbarRect.right + topDragDetectionWidth;
        } else if (dragDetectionDirection === ExtensionDirection.LEFT) {
            return x >= toolbarRect.left - topDragDetectionWidth && x <= toolbarRect.right;
        }

        // Default: only within the sidebar itself if no extension direction is provided.
        return x >= toolbarRect.left && x <= toolbarRect.right;
    }

    private isMouseInBottomDragDetectionZone(x: number, y: number, bottomSectionTop: number): boolean {
        if (!this.toolbarRef.current) {
            return false;
        }

        const { dragDetectionDirection, bottomDragDetectionWidth = 40 } = this.props;
        const toolbarRect: DOMRect = this.toolbarRef.current.getBoundingClientRect();

        // Vertical check for Bottom Zone.
        if (y < bottomSectionTop || y > toolbarRect.bottom) {
            return false;
        }

        // Horizontal check.
        if (dragDetectionDirection === ExtensionDirection.RIGHT) {
            return x >= toolbarRect.left && x <= toolbarRect.right + bottomDragDetectionWidth;
        } else if (dragDetectionDirection === ExtensionDirection.LEFT) {
            return x >= toolbarRect.left - bottomDragDetectionWidth && x <= toolbarRect.right;
        }

        // Default.
        return x >= toolbarRect.left && x <= toolbarRect.right;
    }

    private renderSeparator(): ReactNode {
        const theme: Theme = Theme.getInstance();
        const { topBelowActions }: GlobalSideBarState = this.state;
        
        const isEmpty: boolean = topBelowActions.length === 0;
        const inTopArea: boolean = this.isInTopDragDetectionArea();

        if (isEmpty && !inTopArea) {
            return null;
        }

        const color: string = (isEmpty && inTopArea) ? theme.colors.attention.focus : theme.colors.neutral.border;
        const separatorHeight: number = 0.5;  // Manually aligned with IDEA dimensions.
        const separatorWidth: number = 25;  // Manually aligned with IDEA dimensions.

        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center',
                width: '100%',
            }}>
                <div style={{
                    height: `${separatorHeight}px`,
                    width: `${separatorWidth}px`,
                    backgroundColor: color,
                }} />
            </div>
        );
    }

    private getGroupIdForSection(section: SideBarSection): string | undefined {
        if (section === SideBarSection.TOP_ABOVE) {
            return this.props.topAboveActionsGroupId;
        }
        
        if (section === SideBarSection.TOP_BELOW) {
            return this.props.topBelowActionsGroupId;
        }
        
        return this.props.bottomActionsGroupId;
    }

    private calculateIndexInGroup(container: HTMLDivElement, mouseY: number, group: SideBarSection): { index: number } {
        const children: HTMLCollection = container.children;
        const count: number = children.length;
        if (count === 0) {
            return { index: 0 };
        }

        const { dragSession } = this.state;
        const currentGroupId: string | undefined = this.getGroupIdForSection(group);
        const currentTargetIndex: number = (dragSession && dragSession.dropTarget && dragSession.dropTarget.targetGroupId === currentGroupId) 
            ? dragSession.dropTarget.targetIndex 
            : -1;

        for (let i: number = 0; i < count; i++) {
            const rect: DOMRect = children[i].getBoundingClientRect();

            // 1. Sticky range: If mouse is within the vertical bounds of the item/indicator.
            if (mouseY >= rect.top && mouseY <= rect.bottom) {
                return { index: i };
            }

            // 2. Boundary cases for the ends of the list.
            if (i === 0 && mouseY < rect.top) {
                return { index: 0 };
            }

            if (i === count - 1 && mouseY > rect.bottom) {
                return { index: count - 1 };
            }

            // 3. Gap logic with hysteresis (stickiness).
            if (i < count - 1) {
                const nextRect: DOMRect = children[i + 1].getBoundingClientRect();

                if (mouseY > rect.bottom && mouseY < nextRect.top) {
                    if (currentTargetIndex === i || currentTargetIndex === i + 1) {
                        return { index: currentTargetIndex };
                    }
                    
                    // Default to closest.
                    return { index: (mouseY - rect.bottom < nextRect.top - mouseY) ? i : i + 1 };
                }
            }
        }

        return { index: count - 1 };
    }

    private renderGroup(group: SideBarSection): ReactNode {
        const { dragSession }: GlobalSideBarState = this.state;
        let originalActions: ReactElement<any, typeof IconButton>[];
        let groupId: string | undefined;

        if (group === SideBarSection.TOP_ABOVE) {
            originalActions = this.state.topAboveActions;
            groupId = this.props.topAboveActionsGroupId;
        } else if (group === SideBarSection.TOP_BELOW) {
            originalActions = this.state.topBelowActions;
            groupId = this.props.topBelowActionsGroupId;
        } else {
            originalActions = this.state.bottomActions;
            groupId = this.props.bottomActionsGroupId;
        }

        const items: { action: ReactElement, index: number }[] = originalActions.map((action: ReactElement, index: number): { action: ReactElement, index: number } => ({ action, index }));
        
        const visibleItems: { action: ReactElement, index: number }[] = items.filter((item: { index: number }): boolean => 
            !(dragSession && dragSession.sourceGroupId === groupId && dragSession.sourceIndex === item.index)
        );

        const rendered: ReactNode[] = visibleItems.map((item: { action: ReactElement, index: number }): ReactNode => (
            <div 
                key={`${group}-${item.index}`}
                onMouseDown={(event: ReactMouseEvent): void => this.handleMouseDown(group, item.index, event)}
                style={{ 
                    cursor: dragSession ? 'grabbing' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                }}
            >
                {cloneElement(item.action as ReactElement<any>, {
                    size: Size.MEDIUM
                })}
            </div>
        ));

        const isTargetInThisSection: boolean = !!(dragSession && dragSession.dropTarget && dragSession.dropTarget.targetGroupId === groupId);
        const isEmpty: boolean = group === SideBarSection.TOP_BELOW && originalActions.length === 0;

        if (dragSession && isTargetInThisSection && dragSession.dropTarget) {
            rendered.splice(dragSession.dropTarget.targetIndex, 0, this.renderIndicator(dragSession.dropTarget.targetIndex, group, originalActions, true));
        } else if (isEmpty && this.isInTopDragDetectionArea()) {
            rendered.push(this.renderIndicator(0, group, originalActions, false));
        }

        return rendered;
    }

    private renderIndicator(index: number, group: SideBarSection, originalActions: ReactElement[], isTargeted: boolean): ReactNode {
        const theme: Theme = Theme.getInstance();
        const { dragSession }: GlobalSideBarState = this.state;

        if (!dragSession) {
            return null;
        }

        const isTopBelowEmpty: boolean = group === SideBarSection.TOP_BELOW && originalActions.length === 0;

        return (
            <div 
                key={`indicator-${index}`}
                style={{
                    position: 'relative',
                    height: `${dragSession.draggedSize.height}px`,
                    width: `${dragSession.draggedSize.width}px`,
                }}
            >
                {isTargeted && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: theme.colors.selection.background,
                        opacity: 0.3,  // Make the background color match #D4E2FF.
                        borderRadius: theme.layout.sizing.common.borderRadius,
                    }} />
                )}
                
                {isTopBelowEmpty && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        border: `1.8px dashed ${theme.colors.attention.focus}`,  // Make the background color match #D4E2FF.
                        boxSizing: 'border-box',
                    }} />
                )}
            </div>
        );
    }

    private getGroupContainerStyles(): CSSProperties {
        return {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: this.gap,
            width: '100%',
        };
    }
}


export default GlobalSideBar;
