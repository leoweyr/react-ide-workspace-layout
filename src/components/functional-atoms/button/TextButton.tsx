import { Component, ReactNode, CSSProperties, MouseEvent, ReactElement } from 'react';

import { Size } from '../../style-atoms';
import { Tooltip } from '../tooltip';
import { ButtonVariant } from './enums/ButtonVariant';
import Button from './Button';


interface TextButtonProps {
    text: string;
    size?: Size;
    tooltip?: ReactElement<any, typeof Tooltip>;
    onClick?: (event: MouseEvent) => void;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
}


class TextButton extends Component<TextButtonProps> {
    public render(): ReactNode {
        const { 
            text,
            onClick, 
            tooltip,
            disabled, 
            size,
            className, 
            style 
        } = this.props;

        return (
            <Button
                text={text}
                onClick={onClick}
                tooltip={tooltip}
                disabled={disabled}
                variant={ButtonVariant.GHOST}
                size={size}
                className={className}
                style={style}
            />
        );
    }
}


export default TextButton;
