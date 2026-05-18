import { ReactElement, CSSProperties, Component, ReactNode, cloneElement } from 'react';

import { Icon } from './icon';
import { Size } from './enums/Size';
import { Theme } from '../../features';


interface LabelProps {
    text: string;
    icon?: ReactElement<any, typeof Icon>;
    size?: Size;
    html?: boolean;
    copyable?: boolean;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
}


class Label extends Component<LabelProps> {
    public render(): ReactNode {
        const {
            text,
            icon,
            html = false,
            className
        } = this.props;

        return (
            <div
                className={className}
                style={this.getContainerStyles()}
            >
                {icon && <span style={this.getIconStyles()}>{this.renderIcon(icon)}</span>}
                {html ? (
                    <span
                        style={this.getTextStyles()}
                        dangerouslySetInnerHTML={{ __html: text }}
                    />
                ) : (
                    <span style={this.getTextStyles()}>{text}</span>
                )}
            </div>
        );
    }

    private renderIcon(icon: ReactElement<any, typeof Icon>): ReactNode {
        return cloneElement(icon, {
            size: this.props.size
        });
    }

    private getContainerStyles(): CSSProperties {
        const { style } = this.props;
        const theme: Theme = Theme.getInstance();

        return {
            display: 'inline-flex',
            alignItems: 'center',
            verticalAlign: 'middle',
            maxWidth: '100%',
            gap: theme.layout.spacing.small,
            ...style,
        };
    }

    private getIconStyles(): CSSProperties {
        return {
            display: 'flex',
            alignItems: 'center',
        };
    }

    private getTextStyles(): CSSProperties {
        const { copyable = false } = this.props;
        const theme: Theme = Theme.getInstance();

        return {
            color: this.getColor(),
            fontSize: this.getFontSize(),
            fontFamily: theme.typography.font.family,
            lineHeight: theme.typography.line.height,
            userSelect: copyable ? 'text' : 'none',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            cursor: 'default',
        };
    }

    private getColor(): string {
        const { disabled = false } = this.props;
        const theme: Theme = Theme.getInstance();

        if (disabled) {
            return theme.colors.neutral.textSecondary;
        }

        return theme.colors.neutral.text;
    }

    private getFontSize(): string {
        const { size } = this.props;
        const theme: Theme = Theme.getInstance();

        switch (size) {
            case Size.SMALL:
                return theme.typography.font.sizeSmall;
            case Size.LARGE:
                return theme.typography.font.sizeLarge;
            case Size.MEDIUM:
            default:
                return theme.typography.font.sizeMedium;
        }
    }
}


export default Label;
