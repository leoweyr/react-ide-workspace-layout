import { Component, ReactNode, CSSProperties, ReactElement, cloneElement } from 'react';

import { Theme } from '../../features';
import { Size } from '../style-atoms';
import GlobalTopBar from './sidebars/GlobalTopBar';
import GlobalSideBar from './sidebars/GlobalSideBar';
import GlobalBottomBar from './sidebars/GlobalBottomBar';
import { SideBarDragSession, SideBarDragListener } from './sidebars/interfaces/SideBarDragSession';


interface WorkspaceProps {
    topBar?: ReactElement<any, typeof GlobalTopBar>;
    leftBar?: ReactElement<any, typeof GlobalSideBar>;
    rightBar?: ReactElement<any, typeof GlobalSideBar>;
    bottomBar?: ReactElement<any, typeof GlobalBottomBar>;
    children?: ReactNode;
    style?: CSSProperties;
    className?: string;
}


interface WorkspaceState {
    dragSession: SideBarDragSession | null;
}


class Workspace extends Component<WorkspaceProps, WorkspaceState> {
    private handleDragUpdate: SideBarDragListener = (session: SideBarDragSession | null): void => {
        this.setState({ dragSession: session });
    };

    constructor(props: WorkspaceProps) {
        super(props);

        this.state = {
            dragSession: null
        };
    }

    public render(): ReactNode {
        const {
            topBar,
            leftBar,
            rightBar,
            bottomBar,
            children,
            className,
            style
        } = this.props;

        const { dragSession } = this.state;
        const theme: Theme = Theme.getInstance();

        return (
            <div className={className} style={this.getContainerStyles(theme, style)}>
                {topBar}

                <div style={this.getMainRowStyles()}>
                    {leftBar}

                    <div style={this.getContentAreaStyles()}>
                        {children}
                    </div>

                    {rightBar}
                </div>

                {bottomBar}

                {dragSession && this.renderGhost(theme, dragSession)}
            </div>
        );
    }

    public componentDidMount(): void {
        GlobalSideBar.subscribeToDrag(this.handleDragUpdate);
    }

    public componentWillUnmount(): void {
        GlobalSideBar.unsubscribeFromDrag(this.handleDragUpdate);
    }

    private renderGhost(theme: Theme, session: SideBarDragSession): ReactNode {
        const { mousePos, dragOffset, draggedSize, draggedElement } = session;

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

    private getContainerStyles(theme: Theme, customStyle?: CSSProperties): CSSProperties {
        return {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: theme.colors.neutral.panelBackground,
            color: theme.colors.neutral.text,
            fontFamily: theme.typography.font.family,
            overflow: 'hidden',
            ...customStyle
        };
    }

    private getMainRowStyles(): CSSProperties {
        return {
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            overflow: 'hidden'
        };
    }

    private getContentAreaStyles(): CSSProperties {
        return {
            flex: 1,
            position: 'relative',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column'
        };
    }
}


export default Workspace;
