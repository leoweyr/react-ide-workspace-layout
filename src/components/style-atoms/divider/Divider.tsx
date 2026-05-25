import { Component, ReactNode, CSSProperties } from 'react';

import { Theme } from '../../../features';
import { Orientation } from '../enums/Orientation';


interface DividerProps {
    orientation?: Orientation;
    thickness?: number;
    length?: number | string;
    color?: string;
    className?: string;
    style?: CSSProperties;
}


class Divider extends Component<DividerProps> {
    public render(): ReactNode {
        const className: string | undefined = this.props.className;

        return (
            <div className={className} style={this.getStyles()} />
        );
    }

    private getStyles(): CSSProperties {
        const theme: Theme = Theme.getInstance();
        const orientation: Orientation = this.props.orientation ?? Orientation.HORIZONTAL;
        const thickness: number = this.props.thickness ?? 1;
        const length: number | string = this.props.length ?? '100%';
        const color: string | undefined = this.props.color;
        const customStyle: CSSProperties | undefined = this.props.style;

        const isHorizontal: boolean = orientation === Orientation.HORIZONTAL;

        return {
            backgroundColor: color ?? theme.colors.neutral.border,
            width: isHorizontal ? length : `${thickness}px`,
            height: isHorizontal ? `${thickness}px` : length,
            flexShrink: 0,
            ...customStyle,
        };
    }
}


export default Divider;
