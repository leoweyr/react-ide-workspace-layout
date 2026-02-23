import { MouseEvent, CSSProperties, Component, ReactNode } from 'react';

import { SplitterOrientation } from './enums/SplitterOrientation';
import { Theme } from '../../theme/Theme';


export interface SplitterProps {
    orientation?: SplitterOrientation;
    onResize?: (delta: number) => void;
    size?: number;
    className?: string;
    style?: CSSProperties;
}

export interface SplitterState {
    isDragging: boolean;
    isHovered: boolean;
}

export class Splitter extends Component<SplitterProps, SplitterState> {
    private startPos: number = 0;

    private handleMouseDown: (event: MouseEvent) => void = (event: MouseEvent): void => {
        event.preventDefault();
        this.startPos = this.props.orientation === SplitterOrientation.HORIZONTAL ? event.clientY : event.clientX;
        this.setState({ isDragging: true });
        this.addListeners();
        document.body.style.cursor = this.props.orientation === SplitterOrientation.HORIZONTAL ? 'row-resize' : 'col-resize';
    };

    private handleMouseMove: (event: globalThis.MouseEvent) => void = (event: globalThis.MouseEvent): void => {
        if (!this.state.isDragging) return;
    
        const currentPos: number = this.props.orientation === SplitterOrientation.HORIZONTAL ? event.clientY : event.clientX;
        const delta: number = currentPos - this.startPos;
    
        if (this.props.onResize) {
            this.props.onResize(delta);
        }
    
        this.startPos = currentPos;
    };

    private handleMouseUp: () => void = (): void => {
        this.setState({ isDragging: false });
        this.removeListeners();
        document.body.style.cursor = '';
    };

    private handleMouseEnter: () => void = (): void => {
        this.setState({ isHovered: true });
    };

    private handleMouseLeave: () => void = (): void => {
        this.setState({ isHovered: false });
    };

    constructor(props: SplitterProps) {
        super(props);

        this.state = {
            isDragging: false,
            isHovered: false,
        };
    }

    public componentWillUnmount(): void {
        this.removeListeners();
    }

    public render(): ReactNode {
        return (
            <div
                className={this.props.className}
                style={this.getStyles()}
                onMouseDown={this.handleMouseDown}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            />
        );
    }

    private addListeners(): void {
        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseup', this.handleMouseUp);
    }

    private removeListeners(): void {
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseup', this.handleMouseUp);
    }

    private getStyles(): CSSProperties {
        const theme = Theme.getInstance();
        const { orientation = SplitterOrientation.VERTICAL, size = 4, style } = this.props;
        const { isDragging, isHovered } = this.state;

        const isHorizontal: boolean = orientation === SplitterOrientation.HORIZONTAL;
    
        return {
            width: isHorizontal ? '100%' : size,
            height: isHorizontal ? size : '100%',
            backgroundColor: (isDragging || isHovered) ? theme.colors.selection : theme.colors.border,
            cursor: isHorizontal ? 'row-resize' : 'col-resize',
            zIndex: 10,
            opacity: (isDragging || isHovered) ? 1 : 0.5,
            transition: 'background-color 0.1s, opacity 0.1s',
            userSelect: 'none',
            ...style,
        };
    }
}
