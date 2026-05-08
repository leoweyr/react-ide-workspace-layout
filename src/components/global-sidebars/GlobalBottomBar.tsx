import { Component, ReactNode, CSSProperties } from 'react';

import { 
    Toolbar, 
    Orientation, 
    Label, 
    ComponentStyle 
} from '../style-atoms';
import { Theme } from '../../features/theme/Theme';


interface GlobalBottomBarProps {
    className?: string;
    style?: CSSProperties;
}


class GlobalBottomBar extends Component<GlobalBottomBarProps> {
    public render(): ReactNode {
        const { className, style } = this.props;
        const theme: Theme = Theme.getInstance();

        return (
            <Toolbar 
                orientation={Orientation.HORIZONTAL} 
                thickness={theme.layout.sizing.bars.sideWidth}
                className={className} 
                style={style}
            >
                <Label text="src > components > global-sidebars > GlobalBottomBar.tsx" componentStyle={ComponentStyle.SMALL} />

                <div style={{ flex: 1 }} />

                <Label text="UTF-8" componentStyle={ComponentStyle.SMALL} />
                <Label text="4 spaces" componentStyle={ComponentStyle.SMALL} />
                <Label text="main" componentStyle={ComponentStyle.SMALL} />
            </Toolbar>
        );
    }
}


export default GlobalBottomBar;
