import { CSSProperties, Component, ChangeEvent, ReactNode } from 'react';

import { IconName } from './enums/IconName';
import { Theme } from '../../theme/Theme';
import { Icon } from './Icon';


export interface InputProps {
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    icon?: IconName;
    fullWidth?: boolean;
    borderless?: boolean;
    className?: string;
    style?: CSSProperties;
}


export interface InputState {
    isFocused: boolean;
    isHovered: boolean;
}


export class Input extends Component<InputProps, InputState> {
    private handleFocus: () => void = (): void => {
        this.setState({ isFocused: true });
    };

    private handleBlur: () => void = (): void => {
        this.setState({ isFocused: false });
    };

    private handleMouseEnter: () => void = (): void => {
        this.setState({ isHovered: true });
    };

    private handleMouseLeave: () => void = (): void => {
        this.setState({ isHovered: false });
    };

    private handleChange: (event: ChangeEvent<HTMLInputElement>) => void = (event: ChangeEvent<HTMLInputElement>): void => {
        if (this.props.onChange) {
            this.props.onChange(event.target.value);
        }
    };

    constructor(props: InputProps) {
        super(props);

        this.state = {
            isFocused: false,
            isHovered: false,
        };
    }

    public render(): ReactNode {
        const theme = Theme.getInstance();
        const { value, placeholder, icon, className } = this.props;

        return (
            <div 
                className={className} 
                style={this.getContainerStyles()}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
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
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    style={this.getInputStyles()}
                />
            </div>
        );
    }

    private getContainerStyles(): CSSProperties {
        const theme = Theme.getInstance();
        const { fullWidth, borderless, style } = this.props;
        const { isFocused, isHovered } = this.state;

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
