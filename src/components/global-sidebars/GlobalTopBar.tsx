import { Component, ReactNode, CSSProperties, ReactElement, cloneElement, isValidElement, createRef } from 'react';

import { 
    Icon, 
    Toolbar,
    Orientation, 
    JETBRAINS_ICONS,
    Size
} from '../style-atoms';
import { 
    TextButton, 
    IconButton, 
    DropDownMenuButton, 
    Tooltip 
} from '../functional-atoms';
import { Theme } from '../../features/theme/Theme';


interface GlobalTopBarProps {
    logo?: ReactElement<any, typeof Icon>;
    menuItems?: ReactElement<any, typeof TextButton>[];

    /** Context-specific global actions displayed after the logo and main menu. These actions are hidden when the menu is expanded to maximize space. */
    leftActions?: (ReactElement<any, typeof IconButton> | ReactElement<any, typeof DropDownMenuButton>)[];

    /** Universal utility actions and system status indicators positioned at the far right of the top bar. These actions remain persistently visible. */
    rightActions?: (ReactElement<any, typeof IconButton> | ReactElement<any, typeof DropDownMenuButton>)[];
    className?: string;
    style?: CSSProperties;
}


interface GlobalTopBarState {
    isMenuExpanded: boolean;
}


class GlobalTopBar extends Component<GlobalTopBarProps, GlobalTopBarState> {
    private menuRef = createRef<HTMLDivElement>();

    private handleMenuToggle: () => void = (): void => {
        this.setState((prevState: GlobalTopBarState): GlobalTopBarState => ({
            isMenuExpanded: !prevState.isMenuExpanded,
        }));
    };

    private handleGlobalClick: (event: MouseEvent) => void = (event: MouseEvent): void => {
        if (!this.state.isMenuExpanded) {
            return;
        }

        // If the click is outside the menu container, collapse the menu.
        if (this.menuRef.current && !this.menuRef.current.contains(event.target as Node)) {
            this.setState({ isMenuExpanded: false });
        }
    };

    constructor(props: GlobalTopBarProps) {
        super(props);

        this.state = {
            isMenuExpanded: false,
        };
    }

    public componentDidMount(): void {
        document.addEventListener('mousedown', this.handleGlobalClick);
    }

    public componentWillUnmount(): void {
        document.removeEventListener('mousedown', this.handleGlobalClick);
    }

    public render(): ReactNode {
        const { 
            logo, 
            menuItems, 
            leftActions, 
            rightActions, 
            className, 
            style 
        } = this.props;

        const { isMenuExpanded } = this.state;
        const theme: Theme = Theme.getInstance();

        // Enforce LARGE size for the logo icon.
        const logoElement: ReactNode = logo && isValidElement(logo) ? cloneElement(logo as ReactElement, {
            size: Size.LARGE
        }) : logo;

        return (
            <Toolbar 
                orientation={Orientation.HORIZONTAL}
                thickness={39}
                gap={theme.layout.spacing.small}
                padding={theme.layout.spacing.medium}
                className={className} 
                style={style}
            >
                {logoElement}

                {isMenuExpanded ? (
                    <div ref={this.menuRef} style={{ display: 'contents' }}>
                        {this.enforceLargeSize(menuItems)}
                    </div>
                ) : (
                    <>
                        <IconButton 
                            icon={JETBRAINS_ICONS.Menu} 
                            size={Size.LARGE}
                            tooltip={<Tooltip text="Main Menu" />} 
                            onClick={this.handleMenuToggle}
                        />
                        {this.enforceLargeSize(leftActions)}
                    </>
                )}

                {/* Flexible spacer to push right actions to the end while maintaining the Toolbar's gap logic. */}
                <div style={{ flex: 1 }} />

                {/* Directly render right actions to participate in the Toolbar's gap. */}
                {this.enforceLargeSize(rightActions)}
            </Toolbar>
        );
    }

    private enforceLargeSize(elements: (ReactElement<any, typeof TextButton> | ReactElement<any, typeof IconButton> | ReactElement<any, typeof DropDownMenuButton>)[] | undefined): ReactNode[] | undefined {
        if (!elements) {
            return undefined;
        }

        return elements.map((element: ReactElement) => {
            if (isValidElement(element)) {
                return cloneElement(element as ReactElement<any>, {
                    size: Size.LARGE
                });
            }

            return element;
        });
    }
}


export default GlobalTopBar;
