import { ReactElement, Component, ReactNode, CSSProperties, cloneElement, isValidElement } from 'react';

import { Theme } from '../../../features';
import { IconButton, Tooltip, TooltipPosition } from '../../functional-atoms';
import { Toolbar, Label, Size, JETBRAINS_ICONS, Orientation, Icon } from '../../style-atoms';


interface WindowHeaderProps {
    title: string;
    rightActions: ReactElement<any, typeof IconButton>[];
    
    /** Whether the header (or its relative panel container) currently has focus. */
    isFocused?: boolean;

    className?: string;
    style?: CSSProperties;
}


class WindowHeader extends Component<WindowHeaderProps> {
    public render(): ReactNode {
        const { title, rightActions, isFocused = true, className, style } = this.props;
        const theme: Theme = Theme.getInstance();

        return (
            <Toolbar
                orientation={Orientation.HORIZONTAL}
                thickness={41}  // Manually aligned with IDEA dimensions.
                gap={theme.layout.spacing.small}
                className={className}
                style={{
                    justifyContent: 'flex-start',
                    borderTop: 'none',
                    paddingLeft: '13px',  // Manually aligned with IDEA dimensions.
                    paddingRight: '10px',  // Manually aligned with IDEA dimensions.
                    ...style
                }}
            >
                <Label text={`<b>${title}</b>`} size={Size.LARGE} html={true} />

                <div style={this.getSpacerStyles()} />

                {isFocused && (
                    <div style={this.getActionsStyles()}>
                        {this.enforceSmallSize(rightActions)}

                        <IconButton 
                            icon={cloneElement(JETBRAINS_ICONS.Remove, { 
                                color: '#999BA4'  // Manually aligned with IDEA dimensions.
                            }) as ReactElement<any, typeof Icon>}
                            size={Size.SMALL}
                            tooltip={<Tooltip text={"Hide"} position={TooltipPosition.BOTTOM} />}
                            style={{
                                padding: '4.5px'  // Manually aligned with IDEA dimensions.
                            }}
                        />
                    </div>
                )}
            </Toolbar>
        );
    }

    private enforceSmallSize(elements: ReactElement<any, typeof IconButton>[] | undefined): ReactNode[] | undefined {
        if (!elements) {
            return undefined;
        }

        return elements.map((element: ReactElement) => {
            if (isValidElement(element)) {
                const props = element.props as any;

                // Clone the icon to inject the color.
                const clonedIcon: ReactNode = props.icon && isValidElement(props.icon) 
                    ? cloneElement(props.icon as ReactElement, {
                        color: '#999BA4'  // Manually aligned with IDEA dimensions.
                    }) 
                    : props.icon;

                return cloneElement(element as ReactElement<any>, {
                    size: Size.SMALL,
                    icon: clonedIcon as ReactElement<any, typeof Icon>,
                    style: {
                        padding: '4.5px'  // Manually aligned with IDEA dimensions.
                    }
                });
            }

            return element;
        });
    }

    private getSpacerStyles(): CSSProperties {
        return {
            flex: 1,
        };
    }

    private getActionsStyles(): CSSProperties {
        return {
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
        };
    }
}


export default WindowHeader;
