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
import { SideBarDragSession, SideBarDragListener } from './interfaces/SideBarDragSession';


interface GlobalSideBarProps {
    topActions?: ReactElement<any, typeof IconButton>[];
    bottomActions?: ReactElement<any, typeof IconButton>[];
    topActionsGroupId?: string;
    bottomActionsGroupId?: string;
    className?: string;
    style?: CSSProperties;
}


interface GlobalSideBarState {
    topActions: ReactElement<any, typeof IconButton>[];
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

    private topGroupRef = createRef<HTMLDivElement>();
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

        const draggedElement: ReactElement<any, typeof IconButton> = group === SideBarSection.TOP ? this.state.topActions[index] : this.state.bottomActions[index];
        const sourceGroupId: string | undefined = group === SideBarSection.TOP ? this.props.topActionsGroupId : this.props.bottomActionsGroupId;

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
                dropTarget: null,
            };

            GlobalSideBar.notifyDragUpdate();
        }, 500);
    };

    private handleWindowMouseMove: (event: MouseEvent) => void = (event: MouseEvent): void => {
        if (GlobalSideBar.dragSession) {
            GlobalSideBar.dragSession.mousePos = { x: event.clientX, y: event.clientY };
            
            // Perform hit testing across all instances.
            let foundTarget: { targetGroupId: string, targetIndex: number } | null = null;

            for (const instance of GlobalSideBar.instances) {
                const target = instance.calculateDropTarget(event.clientX, event.clientY);

                if (target) {
                    foundTarget = target;
                    break;
                }
            }

            GlobalSideBar.dragSession.dropTarget = foundTarget;
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

    private handleTopGroupUpdate: (items: UIGroupItem[]) => void = (items: UIGroupItem[]): void => {
        this.setState({ topActions: items.map((item: UIGroupItem) => item.element as ReactElement<any, typeof IconButton>) });
    };

    private handleBottomGroupUpdate: (items: UIGroupItem[]) => void = (items: UIGroupItem[]): void => {
        this.setState({ bottomActions: items.map((item: UIGroupItem) => item.element as ReactElement<any, typeof IconButton>) });
    };

    private calculateDropTarget: (mouseX: number, mouseY: number) => { targetGroupId: string, targetIndex: number } | null = (mouseX: number, mouseY: number): { targetGroupId: string, targetIndex: number } | null => {
        if (!this.toolbarRef.current) {
            return null;
        }

        const toolbarRect: DOMRect = this.toolbarRef.current.getBoundingClientRect();

        if (mouseX < toolbarRect.left || mouseX > toolbarRect.right || mouseY < toolbarRect.top || mouseY > toolbarRect.bottom) {
            return null;
        }

        const midY: number = toolbarRect.top + toolbarRect.height / 2;
        const isTop: boolean = mouseY < midY;
        const targetGroupId: string | undefined = isTop ? this.props.topActionsGroupId : this.props.bottomActionsGroupId;
        const groupRef: RefObject<HTMLDivElement> = isTop ? this.topGroupRef : this.bottomGroupRef;
        const section: SideBarSection = isTop ? SideBarSection.TOP : SideBarSection.BOTTOM;

        if (!targetGroupId || !groupRef.current) {
            const otherSection: SideBarSection = isTop ? SideBarSection.BOTTOM : SideBarSection.TOP;
            const otherGroupId: string | undefined = isTop ? this.props.bottomActionsGroupId : this.props.topActionsGroupId;
            const otherGroupRef: RefObject<HTMLDivElement> = isTop ? this.bottomGroupRef : this.topGroupRef;

            if (otherGroupId && otherGroupRef.current) {
                const otherRect: DOMRect = otherGroupRef.current.getBoundingClientRect();
                const buffer: number = 20;

                if (mouseY >= otherRect.top - buffer && mouseY <= otherRect.bottom + buffer) {
                    const result = this.calculateIndexInGroup(otherGroupRef.current, mouseY, otherSection);
                    return { targetGroupId: otherGroupId, targetIndex: result.index };
                }
            }

            return null;
        }

        const result = this.calculateIndexInGroup(groupRef.current, mouseY, section);

        return { targetGroupId, targetIndex: result.index };
    };

    constructor(props: GlobalSideBarProps) {
        super(props);

        this.state = {
            topActions: props.topActions || [],
            bottomActions: props.bottomActions || [],
            dragSession: GlobalSideBar.dragSession,
        };

        if (props.topActionsGroupId && props.topActions) {
            this.syncActionsToPool(props.topActionsGroupId, props.topActions);
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
                <div ref={this.topGroupRef} style={this.getGroupContainerStyles()}>
                    {this.renderGroup(SideBarSection.TOP)}
                </div>

                <div style={{ flex: 1 }} />

                <div ref={this.bottomGroupRef} style={this.getGroupContainerStyles()}>
                    {this.renderGroup(SideBarSection.BOTTOM)}
                </div>
            </Toolbar>
        );
    }

    public componentDidUpdate(prevProps: GlobalSideBarProps): void {
        if (prevProps.topActions !== this.props.topActions || prevProps.bottomActions !== this.props.bottomActions) {
            if (!this.props.topActionsGroupId) {
                this.setState({ topActions: this.props.topActions || [] });
            }

            if (!this.props.bottomActionsGroupId) {
                this.setState({ bottomActions: this.props.bottomActions || [] });
            }
        }

        if (prevProps.topActionsGroupId !== this.props.topActionsGroupId) {
            if (prevProps.topActionsGroupId) {
                UIGroupPool.getInstance().unsubscribe(prevProps.topActionsGroupId, this.handleTopGroupUpdate);
            }

            if (this.props.topActionsGroupId) {
                this.subscribeToGroup(this.props.topActionsGroupId, SideBarSection.TOP);
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

        if (this.props.topActionsGroupId) {
            this.subscribeToGroup(this.props.topActionsGroupId, SideBarSection.TOP);
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

        if (this.props.topActionsGroupId) {
            UIGroupPool.getInstance().unsubscribe(this.props.topActionsGroupId, this.handleTopGroupUpdate);
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

        if (section === SideBarSection.TOP) {
            pool.subscribe(groupId, this.handleTopGroupUpdate);
            this.setState({ topActions: pool.getItems(groupId).map((item: UIGroupItem) => item.element as ReactElement<any, typeof IconButton>) });
        } else {
            pool.subscribe(groupId, this.handleBottomGroupUpdate);
            this.setState({ bottomActions: pool.getItems(groupId).map((item: UIGroupItem) => item.element as ReactElement<any, typeof IconButton>) });
        }
    }

    private calculateIndexInGroup(container: HTMLDivElement, mouseY: number, _group: SideBarSection): { index: number } {
        const children: HTMLCollection = container.children;
        const count: number = children.length;

        for (let i: number = 0; i < count; i++) {
            const rect: DOMRect = children[i].getBoundingClientRect();
            const mid: number = rect.top + rect.height / 2;

            if (mouseY < mid) {
                return { index: i };
            }
        }

        return { index: count };
    }

    private renderGroup(group: SideBarSection): ReactNode {
        const { dragSession }: GlobalSideBarState = this.state;
        const originalActions: ReactElement<any, typeof IconButton>[] = group === SideBarSection.TOP ? this.state.topActions : this.state.bottomActions;
        const groupId: string | undefined = group === SideBarSection.TOP ? this.props.topActionsGroupId : this.props.bottomActionsGroupId;
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

        if (dragSession && isTargetInThisSection && dragSession.dropTarget) {
            rendered.splice(dragSession.dropTarget.targetIndex, 0, this.renderIndicator(dragSession.dropTarget.targetIndex));
        }

        return rendered;
    }

    private renderIndicator(index: number): ReactNode {
        const theme: Theme = Theme.getInstance();
        const { dragSession }: GlobalSideBarState = this.state;

        if (!dragSession) {
            return null;
        }

        return (
            <div 
                key={`indicator-${index}`}
                style={{
                    height: `${dragSession.draggedSize.height}px`,
                    width: `${dragSession.draggedSize.width}px`,
                    backgroundColor: theme.colors.selection.background,
                    opacity: 0.3,  // Make the background color match #D4E2FF.
                    borderRadius: theme.layout.sizing.common.borderRadius,
                }}
            />
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
