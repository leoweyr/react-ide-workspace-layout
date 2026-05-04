import { CSSProperties, Component, ReactNode } from 'react';

import { Size } from '../enums/Size';
import { Theme } from '../../../features/theme/Theme';


interface IconProps {
    name: string
    svg: string;
    size?: Size;
    color?: string;
    className?: string;
    style?: CSSProperties;
}


class Icon extends Component<IconProps> {
    public render(): ReactNode {
        const { className, svg } = this.props;

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
        const theme: Theme = Theme.getInstance();
        const { size = Size.MEDIUM, color, style } = this.props;

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
        }

        return {
            width: finalSize,
            height: finalSize,
            fill: color ?? theme.colors.neutral.text,
            display: 'inline-block',
            verticalAlign: 'middle',
            ...style,
        };
    }
}


export default Icon;
