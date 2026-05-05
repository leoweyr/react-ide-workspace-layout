import { CSSProperties, Component, ReactNode } from 'react';

import { Size } from '../enums/Size';


interface IconProps {
    name?: string;
    svg: string;
    size?: Size;
    color?: string;
    className?: string;
    style?: CSSProperties;
}


class Icon extends Component<IconProps> {
    public render(): ReactNode {
        const { className, svg } = this.props;

        // Handle raw SVG source strings.
        if (svg.trim().startsWith('<svg')) {
            return (
                <span
                    className={className}
                    style={this.getStyles()}
                    dangerouslySetInnerHTML={{ __html: svg }}
                />
            );
        }

        return (
            <svg
                className={className}
                style={this.getStyles()}
                viewBox="0 0 24 24"
            >
                <path d={svg} />
            </svg>
        );
    }

    private getStyles(): CSSProperties {
        const { size, color, style } = this.props;

        let finalSize: number;

        switch (size) {
            case Size.SMALL:
                finalSize = 14;
                break;
            case Size.MEDIUM:
                finalSize = 16;
                break;
            case Size.LARGE:
                finalSize = 20;
                break;
            default:
                finalSize = 16;
        }

        return {
            width: finalSize,
            height: finalSize,
            fill: color ?? 'currentColor',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            verticalAlign: 'middle',
            flexShrink: 0,
            ...style,
        };
    }
}


export default Icon;
