import { 
    Component, 
    ReactElement, 
    CSSProperties, 
    createRef, 
    ReactNode, 
    MouseEvent as ReactMouseEvent, 
    cloneElement 
} from 'react';

import { IconButton } from '../functional-atoms';
import { Theme } from '../../features/theme/Theme';
import { 
    Toolbar, 
    Orientation, 
    Size 
} from '../style-atoms';
import { SideBarSection } from './enums/SideBarSection';


interface GlobalSideBarProps {
    topActions?: ReactElement<any, typeof IconButton>[];
    bottomActions?: ReactElement<any, typeof IconButton>[];
    className?: string;
    style?: CSSProperties;
}


interface GlobalSideBarState {
    topActions: ReactElement<any, typeof IconButton>[];
    bottomActions: ReactElement<any, typeof IconButton>[];
    isDragging: boolean;
    draggedItem: { group: SideBarSection, index: number } | null;
    draggedElement: ReactElement<any, typeof IconButton> | null;
    mousePos: { x: number, y: number };
    dragOffset: { x: number, y: number };
    draggedSize: { width: number, height: number };
    dropTarget: { group: SideBarSection, index: number } | null;
}


class GlobalSideBar extends Component<GlobalSideBarProps, GlobalSideBarState> {
    private topGroupRef = createRef<HTMLDivElement>();
    private bottomGroupRef = createRef<HTMLDivElement>();
    private dragTimer: number | undefined;
    private gap: number = Theme.getInstance().layout.spacing.large;

    private handleMouseDown: (group: SideBarSection, index: number, event: ReactMouseEvent) => void = (group: SideBarSection, index: number, event: ReactMouseEvent): void => {
        if (event.button !== 0 || this.state.isDragging) {
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

        this.dragTimer = window.setTimeout((): void => {
            this.setState({
                isDragging: true,
                draggedItem: { group, index },
                draggedElement,
                mousePos: { x, y },
                dragOffset: { x: offsetX, y: offsetY },
                draggedSize: { width, height },
            });
        }, 500);
    };

    private handleWindowMouseMove: (event: MouseEvent) => void = (event: MouseEvent): void => {
        if (this.state.isDragging) {
            this.setState({
                mousePos: { x: event.clientX, y: event.clientY },
            });

            this.updateDropTarget(event.clientY);
        }
    };

    private handleWindowMouseUp: () => void = (): void => {
        if (this.dragTimer) {
            window.clearTimeout(this.dragTimer);
            this.dragTimer = undefined;
        }

        if (this.state.isDragging) {
            this.performDrop();

            this.setState({
                isDragging: false,
                draggedItem: null,
                draggedElement: null,
                dropTarget: null,
            });
        }
    };

    constructor(props: GlobalSideBarProps) {
        super(props);

        this.state = {
            topActions: props.topActions || [],
            bottomActions: props.bottomActions || [],
            isDragging: false,
            draggedItem: null,
            draggedElement: null,
            mousePos: { x: 0, y: 0 },
            dragOffset: { x: 0, y: 0 },
            draggedSize: { width: 0, height: 0 },
            dropTarget: null,
        };
    }

    public render(): ReactNode {
        const { className, style }: GlobalSideBarProps = this.props;
        const { isDragging }: GlobalSideBarState = this.state;

        return (
            <Toolbar
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

                {isDragging && this.renderGhost()}
            </Toolbar>
        );
    }

    public componentDidUpdate(prevProps: GlobalSideBarProps): void {
        // Synchronize internal state with props if they change externally.
        if (prevProps.topActions !== this.props.topActions || prevProps.bottomActions !== this.props.bottomActions) {
            this.setState({
                topActions: this.props.topActions || [],
                bottomActions: this.props.bottomActions || [],
            });
        }
    }

    public componentDidMount(): void {
        window.addEventListener('mousemove', this.handleWindowMouseMove);
        window.addEventListener('mouseup', this.handleWindowMouseUp);
    }

    public componentWillUnmount(): void {
        window.removeEventListener('mousemove', this.handleWindowMouseMove);
        window.removeEventListener('mouseup', this.handleWindowMouseUp);
        
        if (this.dragTimer) {
            window.clearTimeout(this.dragTimer);
        }
    }

    private updateDropTarget(mouseY: number): void {
        const topRect: DOMRect | undefined = this.topGroupRef.current?.getBoundingClientRect();
        const bottomRect: DOMRect | undefined = this.bottomGroupRef.current?.getBoundingClientRect();

        let bestTarget: { group: SideBarSection, index: number } | null = null;

        if (topRect && mouseY < topRect.bottom + 20) {
            bestTarget = this.calculateIndexInGroup(this.topGroupRef.current!, mouseY, SideBarSection.TOP);
        } else if (bottomRect && mouseY > bottomRect.top - 20) {
            bestTarget = this.calculateIndexInGroup(this.bottomGroupRef.current!, mouseY, SideBarSection.BOTTOM);
        }

        this.setState({ dropTarget: bestTarget });
    }

    private calculateIndexInGroup(container: HTMLDivElement, mouseY: number, group: SideBarSection): { group: SideBarSection, index: number } {
        const children: HTMLCollection = container.children;
        const count: number = children.length;

        for (let i: number = 0; i < count; i++) {
            const rect: DOMRect = children[i].getBoundingClientRect();
            const mid: number = rect.top + rect.height / 2;

            if (mouseY < mid) {
                return { group, index: i };
            }
        }

        return { group, index: count };
    }

    private performDrop(): void {
        const { draggedItem, dropTarget, topActions, bottomActions }: GlobalSideBarState = this.state;

        if (!draggedItem || !dropTarget) {
            return;
        }

        const newTop: ReactElement<any, typeof IconButton>[] = [...topActions];
        const newBottom: ReactElement<any, typeof IconButton>[] = [...bottomActions];

        // 1. Remove the dragged item from its original position.
        let item: ReactElement<any, typeof IconButton>;

        if (draggedItem.group === SideBarSection.TOP) {
            item = newTop.splice(draggedItem.index, 1)[0];
        } else {
            item = newBottom.splice(draggedItem.index, 1)[0];
        }

        // 2. Insert into the target group at the specified drop target index.
        if (dropTarget.group === SideBarSection.TOP) {
            newTop.splice(dropTarget.index, 0, item);
        } else {
            newBottom.splice(dropTarget.index, 0, item);
        }

        this.setState({
            topActions: newTop,
            bottomActions: newBottom,
        });
    }

    private renderGroup(group: SideBarSection): ReactNode {
        const { isDragging, draggedItem, dropTarget }: GlobalSideBarState = this.state;
        const originalActions: ReactElement<any, typeof IconButton>[] = group === SideBarSection.TOP ? this.state.topActions : this.state.bottomActions;

        // Map to include original index for stable interaction handling.
        const items: { action: ReactElement, index: number }[] = originalActions.map((action: ReactElement, index: number): { action: ReactElement, index: number } => ({ action, index }));
        
        // Filter out the dragged item if it belongs to this group.
        const visibleItems: { action: ReactElement, index: number }[] = items.filter((item: { index: number }): boolean => 
            !(isDragging && draggedItem?.group === group && draggedItem?.index === item.index)
        );

        const rendered: ReactNode[] = visibleItems.map((item: { action: ReactElement, index: number }): ReactNode => (
            <div 
                key={`${group}-${item.index}`}
                onMouseDown={(event: ReactMouseEvent): void => this.handleMouseDown(group, item.index, event)}
                style={{ 
                    cursor: isDragging ? 'grabbing' : 'pointer',
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

        // Insert indicator at the calculated drop target index.
        if (isDragging && dropTarget && dropTarget.group === group) {
            rendered.splice(dropTarget.index, 0, this.renderIndicator(dropTarget.index));
        }

        return rendered;
    }

    private renderIndicator(index: number): ReactNode {
        const theme: Theme = Theme.getInstance();
        const { draggedSize }: GlobalSideBarState = this.state;

        return (
            <div 
                key={`indicator-${index}`}
                style={{
                    height: `${draggedSize.height}px`,
                    width: `${draggedSize.width}px`,
                    backgroundColor: theme.colors.selection.background,
                    opacity: 0.3,  // Make the background color match #D4E2FF.
                    borderRadius: theme.layout.sizing.common.borderRadius,
                }}
            />
        );
    }

    private renderGhost(): ReactNode {
        const theme: Theme = Theme.getInstance();
        const { mousePos, dragOffset, draggedSize, draggedElement }: GlobalSideBarState = this.state;

        return (
            <div style={{
                position: 'fixed',
                left: mousePos.x - dragOffset.x,
                top: mousePos.y - dragOffset.y,
                width: draggedSize.width,
                height: draggedSize.height,
                backgroundColor: theme.colors.button.fillHover,
                opacity: 0.6,
                zIndex: 9999,
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 0,
            }}>
                {draggedElement && cloneElement(draggedElement as ReactElement<any>, {
                    size: Size.MEDIUM,
                    style: { backgroundColor: 'transparent', border: 'none', borderRadius: 0 },
                    tooltip: undefined,
                })}
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
