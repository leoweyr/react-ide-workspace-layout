import { Component, ReactNode, CSSProperties, MouseEvent } from 'react';

import { Theme } from '../../theme/Theme';
import { SplitterOrientation } from './enums/SplitterOrientation';


interface SplitterDividerProps {
    orientation: SplitterOrientation;
    onMouseDown: (event: MouseEvent) => void;
}


class SplitterDivider extends Component<SplitterDividerProps> {
    public render(): ReactNode {
        const { orientation, onMouseDown } = this.props;
        const theme = Theme.getInstance();
        const isHorizontal = orientation === SplitterOrientation.HORIZONTAL;

        const dividerStyle: CSSProperties = {
            flex: '0 0 1px',
            backgroundColor: theme.colors.border,
            cursor: isHorizontal ? 'row-resize' : 'col-resize',
            position: 'relative',
            zIndex: 1,
        };

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
                style={dividerStyle}
                onMouseDown={onMouseDown}
            >
                <div style={handleOverlayStyle} />
            </div>
        );
    }
}


export default SplitterDivider;
