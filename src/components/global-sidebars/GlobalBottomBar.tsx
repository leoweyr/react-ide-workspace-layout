import { Component, ReactNode, CSSProperties, ReactElement, cloneElement, isValidElement } from 'react';

import { 
    Toolbar, 
    Orientation, 
    Size,
    Breadcrumbs
} from '../style-atoms';
import { 
    IconButton, 
    TextButton, 
    IconWithTextButton,
    TooltipPosition
} from '../functional-atoms';
import { Theme } from '../../features/theme/Theme';


interface GlobalBottomBarProps {
    /**
     * Optional breadcrumbs component to display on the left side.
     */
    breadcrumbs?: ReactElement<any, typeof Breadcrumbs>;

    /**
     * Optional array of buttons to display on the right side.
     */
    rightActions?: (
        ReactElement<any, typeof IconButton> | 
        ReactElement<any, typeof TextButton> | 
        ReactElement<any, typeof IconWithTextButton>
    )[];

    className?: string;
    style?: CSSProperties;
}


class GlobalBottomBar extends Component<GlobalBottomBarProps> {
    public render(): ReactNode {
        const { breadcrumbs, rightActions, className, style }: GlobalBottomBarProps = this.props;
        const theme: Theme = Theme.getInstance();

        const breadcrumbsElement: ReactNode = breadcrumbs && isValidElement(breadcrumbs) ? cloneElement(breadcrumbs as ReactElement, {
            size: Size.SMALL
        }) : null;

        return (
            <Toolbar 
                orientation={Orientation.HORIZONTAL} 
                thickness={29}
                gap={theme.layout.spacing.medium}
                padding={6}
                className={className} 
                style={style}
            >
                {breadcrumbsElement}

                <div style={{ flex: 1 }} />

                {this.enforceSmallSize(rightActions)}
            </Toolbar>
        );
    }

    private enforceSmallSize(elements: (ReactElement<any, typeof IconButton> | ReactElement<any, typeof TextButton> | ReactElement<any, typeof IconWithTextButton>)[] | undefined): ReactNode[] | undefined {
        if (!elements) {
            return undefined;
        }

        return elements.map((element: ReactElement) => {
            if (isValidElement(element)) {
                const props = element.props as any;
                let newTooltip = props.tooltip;

                // Force tooltip position to TOP for all actions in the bottom bar.
                if (isValidElement(props.tooltip)) {
                    newTooltip = cloneElement(props.tooltip as ReactElement, {
                        position: TooltipPosition.TOP
                    });
                }

                return cloneElement(element as ReactElement<any>, {
                    size: Size.SMALL,
                    tooltip: newTooltip
                });
            }

            return element;
        });
    }
}


export default GlobalBottomBar;
