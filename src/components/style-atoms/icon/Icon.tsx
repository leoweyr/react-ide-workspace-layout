import { CSSProperties, Component, ReactNode } from 'react';

import { Size } from '../enums/Size';


interface IconProps {
    name?: string;

    /** The SVG source, which can be a path data string, a raw SVG string, or a URL to an SVG file. */
    svg: string;

    size?: Size;
    color?: string;
    className?: string;
    style?: CSSProperties;
}


class Icon extends Component<IconProps> {
    public render(): ReactNode {
        const { className, svg } = this.props;
        const trimmedSvg: string = svg.trim();

        // Handle raw SVG source strings.
        if (trimmedSvg.startsWith('<svg')) {
            return (
                <span
                    className={className}
                    style={{ ...this.getStyles(), lineHeight: 0, fontSize: 0 }}
                    dangerouslySetInnerHTML={{ __html: svg }}
                />
            );
        }

        // Handle external SVG file links.
        if (this.isUrl(trimmedSvg)) {
            return (
                <span
                    className={className}
                    style={this.getMaskStyles(trimmedSvg)}
                />
            );
        }

        // Handle SVG path data.
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

    private isUrl(src: string): boolean {
        return src.startsWith('http') || 
               src.startsWith('/') || 
               src.startsWith('./') || 
               src.startsWith('../') || 
               src.endsWith('.svg');
    }

    private getBaseStyles(): CSSProperties {
        const { size, style } = this.props;

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
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            verticalAlign: 'middle',
            flexShrink: 0,
            ...style,
        };
    }

    private getStyles(): CSSProperties {
        const { color } = this.props;

        return {
            ...this.getBaseStyles(),
            color: color ?? 'currentColor',
            fill: color ?? 'currentColor',
        };
    }

    private getMaskStyles(url: string): CSSProperties {
        const { color } = this.props;
        const maskValue: string = `url(${url})`;

        const styles: CSSProperties = {
            ...this.getBaseStyles(),
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
        };

        if (color) {
            // If a color is explicitly provided, use mask-image to color the icon.
            styles.backgroundColor = color;
            styles.WebkitMaskImage = maskValue;
            styles.maskImage = maskValue;
        } else {
            // If no color is provided, use background-image to preserve original colors.
            // This avoids the 'grey background' issue caused by forcing backgroundColor: 'currentColor'.
            styles.backgroundImage = maskValue;
            styles.backgroundColor = 'transparent';
        }

        return styles;
    }
}


export default Icon;
