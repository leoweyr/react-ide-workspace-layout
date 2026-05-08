import { Component, ReactNode, CSSProperties, ReactElement, cloneElement, isValidElement } from 'react';

import { Theme } from '../../features/theme/Theme';
import { 
    Toolbar, 
    Orientation,
    Size
} from '../style-atoms';
import { IconButton } from '../functional-atoms';


interface GlobalSideBarProps {
    topActions?: ReactElement<any, typeof IconButton>[];
    bottomActions?: ReactElement<any, typeof IconButton>[];
    className?: string;
    style?: CSSProperties;
}


class GlobalSideBar extends Component<GlobalSideBarProps> {
    public render(): ReactNode {
        const { className, style, topActions, bottomActions } = this.props;
        const theme: Theme = Theme.getInstance();

        return (
            <Toolbar 
                orientation={Orientation.VERTICAL} 
                thickness={39}
                gap={theme.layout.spacing.large}
                padding={5.75}
                className={className} 
                style={style}
            >
                {this.enforceMediumSize(topActions)}

                <div style={{ flex: 1 }} />

                {this.enforceMediumSize(bottomActions)}
            </Toolbar>
        );
    }

    private enforceMediumSize(elements: ReactElement<any, typeof IconButton>[] | undefined): ReactNode[] | undefined {
        if (!elements) {
            return undefined;
        }

        return elements.map((element: ReactElement) => {
            if (isValidElement(element)) {
                return cloneElement(element as ReactElement<any>, {
                    size: Size.MEDIUM
                });
            }

            return element;
        });
    }
}


export default GlobalSideBar;
