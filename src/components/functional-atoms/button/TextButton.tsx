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

        let paddingY: number;

        switch (size) {
            // Size not manually checked yet.
            case Size.SMALL:
                paddingY = 5.5;

                break;
            case Size.LARGE:
                paddingY = 8.25;

                break;

            // Size not manually checked yet.
            case Size.MEDIUM:
            default:
                paddingY = 5.5;

                break;
        }

        return (
            <Button
                text={text}
                onClick={onClick}
                tooltip={tooltip}
                disabled={disabled}
                variant={ButtonVariant.GHOST}
                size={size}
                className={className}
                style={{ 
                    ...style, 
                    paddingTop: `${paddingY}px`,
                    paddingBottom: `${paddingY}px`
                }}
            />
        );
    }
}


export default TextButton;
