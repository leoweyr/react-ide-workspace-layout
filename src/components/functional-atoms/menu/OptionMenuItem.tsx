import { Component, ReactNode, CSSProperties, ReactElement, MouseEvent as ReactMouseEvent, cloneElement, isValidElement } from 'react';

import MenuItem from './MenuItem';
import { Label, Icon, Size } from '../../style-atoms';
import { Theme } from '../../../features';


interface OptionMenuItemProps {
    text: string;
    icon?: ReactElement<any, typeof Icon>;
    rightSide?: ReactElement<any, typeof Icon> | ReactElement<any, typeof Label>;
    onClick?: (event: ReactMouseEvent) => void;
    onMouseEnter?: (event: ReactMouseEvent) => void;
    onMouseLeave?: (event: ReactMouseEvent) => void;
    className?: string;
    style?: CSSProperties;
}


class OptionMenuItem extends Component<OptionMenuItemProps> {
    public render(): ReactNode {
        const { 
            text, 
            icon, 
            rightSide, 
            onClick, 
            onMouseEnter, 
            onMouseLeave, 
            className, 
            style 
        }: OptionMenuItemProps = this.props;

        return (
            <MenuItem
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className={className}
                style={style}
            >
                {/* Icon slot: Always occupies space even if no icon is provided. */}
                <div style={this.getIconContainerStyles()}>
                    {icon && this.renderIcon(icon)}
                </div>

                {/* Text slot: Expands to fill available space. */}
                <div style={this.getTextContainerStyles()}>
                    <Label text={text} />
                </div>

                {/* Right side slot: Aligned to the right. */}
                {rightSide && (
                    <div style={this.getRightSideStyles()}>
                        {this.renderRightSide(rightSide)}
                    </div>
                )}
            </MenuItem>
        );
    }

    private renderIcon(icon: ReactElement<any, typeof Icon>): ReactNode {
        return cloneElement(icon, {
            size: Size.MEDIUM  // Manually aligned with IDEA dimensions.
        });
    }

    private renderRightSide(content: ReactElement<any, typeof Icon> | ReactElement<any, typeof Label>): ReactNode {
        const theme: Theme = Theme.getInstance();

        if (isValidElement(content)) {
            // If it's an Icon, ensure it has the correct size.
            if ((content.type as any) === Icon) {
                return cloneElement(content as ReactElement<any, typeof Icon>, {
                    size: Size.MEDIUM,
                    // Secondary text color for right-side icons if not specified.
                    color: content.props.color || theme.colors.neutral.textSecondary
                });
            }
        }

        return content;
    }

    private getIconContainerStyles(): CSSProperties {
        return {
            width: '16.5px',  // Manually aligned with IDEA dimensions.
            height: '0px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
        };
    }

    private getTextContainerStyles(): CSSProperties {
        return {
            flex: 1,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            paddingRight: '30px'  // Manually aligned with IDEA dimensions.
        };
    }

    private getRightSideStyles(): CSSProperties {
        const { rightSide }: OptionMenuItemProps = this.props;

        let paddingRight: number = 0;

        // Manually aligned with IDEA dimensions.
        if (isValidElement(rightSide)) {
            if ((rightSide.type as any) === Icon) {
                paddingRight = 0;
            } else if ((rightSide.type as any) === Label) {
                paddingRight = 4;
            }
        }

        return {
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto',
            paddingRight: `${paddingRight}px`,  // Manually aligned with IDEA dimensions.
            flexShrink: 0
        };
    }
}


export default OptionMenuItem;
