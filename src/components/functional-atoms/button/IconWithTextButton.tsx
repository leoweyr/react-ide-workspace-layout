import { Component, ReactNode, MouseEvent, CSSProperties, ReactElement } from 'react';

import { Icon, Size } from '../../style-atoms';
import { Tooltip } from '../tooltip';
import { ButtonVariant } from './enums/ButtonVariant';
import Button from './Button';


interface IconWithTextButtonProps {
    icon: ReactElement<any, typeof Icon>;
    text: string;
    size?: Size;
    tooltip?: ReactElement<any, typeof Tooltip>;
    onClick?: (event: MouseEvent) => void;
    disabled?: boolean;
    active?: boolean;
    className?: string;
    style?: CSSProperties;
}


class IconWithTextButton extends Component<IconWithTextButtonProps> {
    public render(): ReactNode {
        const { 
            icon, 
            text,
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
                text={text}
                variant={ButtonVariant.GHOST}
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


export default IconWithTextButton;
