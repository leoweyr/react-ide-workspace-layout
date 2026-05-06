import { Component, ReactNode, MouseEvent, CSSProperties, ReactElement } from 'react';

import { Icon, Size } from '../../style-atoms';
import { Tooltip } from '../tooltip';
import { ButtonVariant } from './enums/ButtonVariant';
import Button from './Button';


interface IconButtonProps {
    icon: ReactElement<any, typeof Icon>;
    size?: Size;
    onClick?: (event: MouseEvent) => void;
    tooltip?: ReactElement<any, typeof Tooltip>;
    disabled?: boolean;
    active?: boolean;
    className?: string;
    style?: CSSProperties;
}


class IconButton extends Component<IconButtonProps> {
    public render(): ReactNode {
        const { 
            icon, 
            size = Size.MEDIUM, 
            onClick, 
            tooltip, 
            disabled, 
            active, 
            className, 
            style 
        } = this.props;

        return (
            <Button
                icon={icon}
                variant={ButtonVariant.ICON}
                size={size}
                onClick={onClick}
                tooltip={tooltip}
                disabled={disabled}
                active={active}
                className={className}
                style={style}
            />
        );
    }
}


export default IconButton;
