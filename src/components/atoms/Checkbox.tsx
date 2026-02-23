import { Component, CSSProperties, ChangeEvent, ReactNode } from 'react';

import { Theme } from '../../theme/Theme';


export interface CheckboxProps {
    checked: boolean;
    label?: string;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
}


export interface CheckboxState {
    isHovered: boolean;
    isFocused: boolean;
}


export class Checkbox extends Component<CheckboxProps, CheckboxState> {
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

        return (
            <label
                className={className}
                style={this.getContainerStyles()}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <div style={this.getCheckboxStyles()}>
                    <input
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        style={this.getInputStyles()}
                    />
                    {checked && this.renderCheckMark()}
                </div>
                {label && <span style={this.getLabelStyles()}>{label}</span>}
            </label>
        );
    }

    private renderCheckMark(): ReactNode {
        return (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" style={{ position: 'absolute', top: '3px', left: '2px', pointerEvents: 'none' }}>
                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }

    private getContainerStyles(): CSSProperties {
        const theme = Theme.getInstance();
        const { disabled } = this.props;

        return {
            display: 'inline-flex',
            alignItems: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
            userSelect: 'none',
            fontSize: theme.typography.fontSize,
            fontFamily: theme.typography.fontFamily,
            ...this.props.style,
        };
    }

    private getCheckboxStyles(): CSSProperties {
        const theme = Theme.getInstance();
        const { checked, disabled } = this.props;
        const { isHovered, isFocused } = this.state;

        let borderColor: string = theme.colors.checkboxBorder;
        let backgroundColor: string = theme.colors.checkboxBackground;

        if (!disabled && (isHovered || isFocused)) {
            borderColor = theme.colors.text;
        }

        if (checked) {
            backgroundColor = theme.colors.checkboxChecked;
            borderColor = theme.colors.checkboxChecked;
        }

        return {
            width: '14px',
            height: '14px',
            borderRadius: '2px',
            border: `1px solid ${borderColor}`,
            backgroundColor: backgroundColor,
            position: 'relative',
            marginRight: theme.spacing.sm,
            transition: 'all 0.1s ease-in-out',
            boxShadow: isFocused ? `0 0 0 2px ${theme.colors.selection}40` : 'none',
        };
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

    private getLabelStyles(): CSSProperties {
        const theme = Theme.getInstance();
        return {
            color: theme.colors.text,
            lineHeight: '1',
        };
    }
}


export default Checkbox;
