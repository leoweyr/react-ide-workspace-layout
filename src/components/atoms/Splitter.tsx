import { Component, ReactNode, CSSProperties, MouseEvent } from 'react';

import { Theme } from '../../theme/Theme';
import { SplitterOrientation } from './enums/SplitterOrientation';


export interface SplitterProps {
    orientation?: SplitterOrientation;
    firstComponent?: ReactNode;
    secondComponent?: ReactNode;
    proportion?: number;
    minProportion?: number;
    maxProportion?: number;
    onChange?: (proportion: number) => void;
    className?: string;
    style?: CSSProperties;
}


export interface SplitterState {
    proportion: number;
    isDragging: boolean;
}


export class Splitter extends Component<SplitterProps, SplitterState> {
    public static defaultProps = {
        orientation: SplitterOrientation.VERTICAL,
        proportion: 0.5,
        minProportion: 0.1,
        maxProportion: 0.9,
    };

    private containerRef: HTMLDivElement | null = null;

    private handleMouseDown: (event: MouseEvent) => void = (event: MouseEvent): void => {
        event.preventDefault();
        this.setState({ isDragging: true });
        this.addListeners();
    };

    private handleMouseMove: (event: globalThis.MouseEvent) => void = (event: globalThis.MouseEvent): void => {
        if (!this.state.isDragging || !this.containerRef) return;

        const { orientation, minProportion = 0.1, maxProportion = 0.9, onChange } = this.props;
        const rect = this.containerRef.getBoundingClientRect();
        
        let newProportion: number;
        
        if (orientation === SplitterOrientation.HORIZONTAL) {
            const relativeY = event.clientY - rect.top;
            newProportion = relativeY / rect.height;
        } else {
            const relativeX = event.clientX - rect.left;
            newProportion = relativeX / rect.width;
        }

        // Clamp proportion.
        newProportion = Math.max(minProportion, Math.min(maxProportion, newProportion));

        this.setState({ proportion: newProportion });

        if (onChange) {
            onChange(newProportion);
        }
    };

    private handleMouseUp: () => void = (): void => {
        this.setState({ isDragging: false });
        this.removeListeners();
    };

    constructor(props: SplitterProps) {
        super(props);

        this.state = {
            proportion: props.proportion ?? 0.5,
            isDragging: false,
        };
    }

    public componentDidUpdate(prevProps: SplitterProps): void {
        if (prevProps.proportion !== this.props.proportion && this.props.proportion !== undefined) {
            this.setState({ proportion: this.props.proportion });
        }
    }

    public componentWillUnmount(): void {
        this.removeListeners();
    }

    public render(): ReactNode {
        const { orientation, firstComponent, secondComponent, className, style } = this.props;
        const { proportion, isDragging } = this.state;
        const theme = Theme.getInstance();

        const isHorizontal = orientation === SplitterOrientation.HORIZONTAL;
        const firstSize = `${proportion * 100}%`;
        const secondSize = `${(1 - proportion) * 100}%`;

        const containerStyle: CSSProperties = {
            display: 'flex',
            flexDirection: isHorizontal ? 'column' : 'row',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            userSelect: isDragging ? 'none' : 'auto',
            ...style,
        };

        const dividerStyle: CSSProperties = {
            flex: '0 0 1px',
            backgroundColor: theme.colors.border,
            cursor: isHorizontal ? 'row-resize' : 'col-resize',
            position: 'relative',
            zIndex: 1,
        };

        // Invisible drag handle for easier grabbing.
        const handleOverlayStyle: CSSProperties = {
            position: 'absolute',
            top: isHorizontal ? '-4px' : '0',
            bottom: isHorizontal ? '-4px' : '0',
            left: isHorizontal ? '0' : '-4px',
            right: isHorizontal ? '0' : '-4px',
            cursor: isHorizontal ? 'row-resize' : 'col-resize',
            zIndex: 2,
        };

        return (
            <div 
                ref={(ref) => this.containerRef = ref} 
                className={className} 
                style={containerStyle}
            >
                <div style={{ flex: `0 0 ${firstSize}`, overflow: 'auto' }}>
                    {firstComponent}
                </div>

                <div 
                    style={dividerStyle}
                    onMouseDown={this.handleMouseDown}
                >
                    <div style={handleOverlayStyle} />
                </div>

                <div style={{ flex: 1, overflow: 'auto' }}>
                    {secondComponent}
                </div>
            </div>
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
}


export default Splitter;
