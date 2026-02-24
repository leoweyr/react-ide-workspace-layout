import { Component, ReactNode, MouseEvent } from 'react';

import { SplitterOrientation } from '../style-atoms/enums/SplitterOrientation';
import StyledSplitterContainer from '../style-atoms/SplitterContainer';
import StyledSplitterDivider from '../style-atoms/SplitterDivider';
import StyledSplitterPane from '../style-atoms/SplitterPane';


interface SplitterProps {
    orientation?: SplitterOrientation;
    firstComponent?: ReactNode;
    secondComponent?: ReactNode;
    proportion?: number;
    minProportion?: number;
    maxProportion?: number;
    onChange?: (proportion: number) => void;
    className?: string;
    style?: React.CSSProperties;
}


interface SplitterState {
    proportion: number;
    isDragging: boolean;
}


class Splitter extends Component<SplitterProps, SplitterState> {
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
        const rect: DOMRect = this.containerRef.getBoundingClientRect();
        
        let newProportion: number;
        
        if (orientation === SplitterOrientation.HORIZONTAL) {
            const relativeY: number = event.clientY - rect.top;
            newProportion = relativeY / rect.height;
        } else {
            const relativeX: number = event.clientX - rect.left;
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
        const { orientation = SplitterOrientation.VERTICAL, firstComponent, secondComponent, className, style } = this.props;
        const { proportion, isDragging } = this.state;

        const firstSize = `${proportion * 100}%`;

        return (
            <StyledSplitterContainer
                orientation={orientation}
                isDragging={isDragging}
                className={className}
                style={style}
                containerRef={(ref) => this.containerRef = ref}
            >
                <StyledSplitterPane size={firstSize} isFlexible={false}>
                    {firstComponent}
                </StyledSplitterPane>

                <StyledSplitterDivider 
                    orientation={orientation}
                    onMouseDown={this.handleMouseDown}
                />

                <StyledSplitterPane isFlexible={true}>
                    {secondComponent}
                </StyledSplitterPane>
            </StyledSplitterContainer>
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
