import { Component, ChangeEvent, ReactNode, CSSProperties } from 'react';

import { IconName } from '../style-atoms/enums/IconName';
import StyledInput from '../style-atoms/Input';


interface InputProps {
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    icon?: IconName;
    fullWidth?: boolean;
    borderless?: boolean;
    className?: string;
    style?: CSSProperties;
}


interface InputState {
    isFocused: boolean;
    isHovered: boolean;
}


class Input extends Component<InputProps, InputState> {
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
        const { value, placeholder, icon, fullWidth, borderless, className, style } = this.props;
        const { isFocused, isHovered } = this.state;

        return (
            <StyledInput
                value={value}
                placeholder={placeholder}
                icon={icon}
                fullWidth={fullWidth}
                borderless={borderless}
                isFocused={isFocused}
                isHovered={isHovered}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                className={className}
                style={style}
            />
        );
    }
}


export default Input;
