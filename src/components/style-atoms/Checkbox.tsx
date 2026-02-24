import { Component, ReactNode, CSSProperties } from 'react';

import { Theme } from '../../theme/Theme';


interface CheckboxProps {
    checked: boolean;
    label?: string;
    disabled?: boolean;
    isHovered: boolean;
    isFocused: boolean;
    inputElement: ReactNode;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    className?: string;
    style?: CSSProperties;
}


class Checkbox extends Component<CheckboxProps> {
    public render(): ReactNode {
        const { checked, label, inputElement, className, onMouseEnter, onMouseLeave } = this.props;

        return (
            <label
                className={className}
                style={this.getContainerStyles()}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <div style={this.getCheckboxStyles()}>
                    {inputElement}
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
        const { disabled, style } = this.props;

        return {
            display: 'inline-flex',
            alignItems: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
            userSelect: 'none',
            fontSize: theme.typography.fontSize,
            fontFamily: theme.typography.fontFamily,
            ...style,
        };
    }

    private getCheckboxStyles(): CSSProperties {
        const theme = Theme.getInstance();
        const { checked, disabled, isHovered, isFocused } = this.props;

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

    private getLabelStyles(): CSSProperties {
        const theme = Theme.getInstance();
        return {
            color: theme.colors.text,
            lineHeight: '1',
        };
    }
}


export default Checkbox;
