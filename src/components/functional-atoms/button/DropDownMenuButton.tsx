import { Component, ReactNode, CSSProperties, MouseEvent, ReactElement } from 'react';

import { Icon, Size, expand } from '../../style-atoms';
import { Tooltip } from '../tooltip';
import { ButtonVariant } from './enums/ButtonVariant';
import Button from './Button';


interface DropDownMenuButtonProps {
    text: string;
    icon?: ReactElement<any, typeof Icon>;
    size?: Size;
    tooltip?: ReactElement<any, typeof Tooltip>;
    onClick?: (event: MouseEvent) => void;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
}


class DropDownMenuButton extends Component<DropDownMenuButtonProps> {
    public render(): ReactNode {
        const { 
            text, 
            icon, 
            onClick, 
            tooltip,
            disabled,
            size,
            className, 
            style 
        } = this.props;

        const arrowPadding: number = size === Size.SMALL ? 20 : (size === Size.MEDIUM ? 24 : 28);
        const arrowRight: number = size === Size.SMALL ? 4 : (size === Size.MEDIUM ? 6 : 8);

        return (
            <div style={this.getWrapperStyles()}>
                <Button
                    icon={icon}
                    text={text}
                    onClick={onClick}
                    tooltip={tooltip}
                    disabled={disabled}
                    variant={ButtonVariant.GHOST}
                    size={size}
                    className={className}
                    style={{ 
                        ...style, 
                        paddingRight: `${arrowPadding}px` 
                    }}
                />
                <Icon
                    name="expand" 
                    svg={expand.path} 
                    size={size === Size.SMALL ? Size.SMALL : Size.MEDIUM} 
                    style={{ 
                        position: 'absolute', 
                        right: `${arrowRight}px`, 
                        pointerEvents: 'none',
                        opacity: disabled ? 0.4 : 0.7 
                    }} 
                />
            </div>
        );
    }

    private getWrapperStyles(): CSSProperties {
        return {
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
        };
    }
}


export default DropDownMenuButton;
