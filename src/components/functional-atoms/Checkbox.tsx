import { Component, CSSProperties, ChangeEvent, ReactNode } from 'react';

import StyledCheckbox from '../style-atoms/Checkbox';


interface CheckboxProps {
    checked: boolean;
    label?: string;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
}


interface CheckboxState {
    isHovered: boolean;
    isFocused: boolean;
}


class Checkbox extends Component<CheckboxProps, CheckboxState> {
    private handleChange: (event: ChangeEvent<HTMLInputElement>) => void = (event: ChangeEvent<HTMLInputElement>): void => {
        if (this.props.disabled) return;

        if (this.props.onChange) {
            this.props.onChange(event.target.checked);
        }
    };

    private handleMouseEnter: () => void = (): void => {
        if (!this.props.disabled) {
            this.setState({ isHovered: true });
        }
    };

    private handleMouseLeave: () => void = (): void => {
        this.setState({ isHovered: false });
    };

    private handleFocus: () => void = (): void => {
        this.setState({ isFocused: true });
    };

    private handleBlur: () => void = (): void => {
        this.setState({ isFocused: false });
    };

    constructor(props: CheckboxProps) {
        super(props);

        this.state = {
            isHovered: false,
            isFocused: false,
        };
    }

    public render(): ReactNode {
        const { checked, label, disabled, className, style } = this.props;
        const { isHovered, isFocused } = this.state;

        return (
            <StyledCheckbox
                checked={checked}
                label={label}
                disabled={disabled}
                isHovered={isHovered}
                isFocused={isFocused}
                className={className}
                style={style}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                inputElement={
                    <input
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        style={this.getInputStyles()}
                    />
                }
            />
        );
    }

    private getInputStyles(): CSSProperties {
        return {
            opacity: 0,
            width: '100%',
            height: '100%',
            margin: 0,
            padding: 0,
            cursor: 'inherit',
            position: 'absolute',
            top: 0,
            left: 0,
        };
    }
}


export default Checkbox;
