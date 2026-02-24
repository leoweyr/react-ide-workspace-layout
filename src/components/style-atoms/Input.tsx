import { Component, ReactNode, CSSProperties, ChangeEvent, FocusEvent, RefObject } from 'react';

import { Theme } from '../../theme/Theme';
import Icon from './Icon';
import { IconName } from './enums/IconName';


interface InputProps {
    value?: string;
    placeholder?: string;
    icon?: IconName;
    fullWidth?: boolean;
    borderless?: boolean;
    isFocused: boolean;
    isHovered: boolean;
    disabled?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    inputRef?: RefObject<HTMLInputElement>;
    className?: string;
    style?: CSSProperties;
}


class Input extends Component<InputProps> {
    public render(): ReactNode {
        const theme = Theme.getInstance();
        const { value, placeholder, icon, onChange, onFocus, onBlur, onMouseEnter, onMouseLeave, inputRef, className } = this.props;

        return (
            <div 
                className={className} 
                style={this.getContainerStyles()}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {icon && (
                    <Icon 
                        name={icon} 
                        size={14} 
                        color={theme.colors.textSecondary} 
                        style={{ marginRight: theme.spacing.sm }} 
                    />
                )}
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    style={this.getInputStyles()}
                />
            </div>
        );
    }

    private getContainerStyles(): CSSProperties {
        const theme = Theme.getInstance();
        const { fullWidth, borderless, isFocused, isHovered, style } = this.props;

        let borderColor: string = theme.colors.inputBorder;

        if (isFocused) {
            borderColor = theme.colors.selection;
        } else if (isHovered && !borderless) {
            borderColor = theme.colors.textSecondary;
        }

        return {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: theme.colors.inputBackground,
            border: borderless ? '1px solid transparent' : `1px solid ${borderColor}`,
            borderRadius: '2px',
            padding: `2px ${theme.spacing.sm}px`,
            width: fullWidth ? '100%' : 'auto',
            transition: 'border-color 0.2s',
            ...style,
        };
    }

    private getInputStyles(): CSSProperties {
        const theme = Theme.getInstance();

        return {
            backgroundColor: 'transparent',
            border: 'none',
            color: theme.colors.text,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.fontSize,
            outline: 'none',
            flex: 1,
            padding: '4px 0',
        };
    }
}


export default Input;
