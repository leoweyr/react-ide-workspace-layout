import { Component, ReactNode, CSSProperties, ReactElement } from 'react';

import { Theme } from '../../features/theme/Theme';
import GlobalTopBar from './sidebars/GlobalTopBar';
import GlobalSideBar from './sidebars/GlobalSideBar';
import GlobalBottomBar from './sidebars/GlobalBottomBar';


interface WorkspaceProps {
    topBar?: ReactElement<any, typeof GlobalTopBar>;
    leftBar?: ReactElement<any, typeof GlobalSideBar>;
    rightBar?: ReactElement<any, typeof GlobalSideBar>;
    bottomBar?: ReactElement<any, typeof GlobalBottomBar>;
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}


class Workspace extends Component<WorkspaceProps> {
    public render(): ReactNode {
        const {
            topBar,
            leftBar,
            rightBar,
            bottomBar,
            children,
            className,
            style
        } = this.props;

        const theme: Theme = Theme.getInstance();

        return (
            <div className={className} style={this.getContainerStyles(theme, style)}>
                {topBar}

                <div style={this.getMainRowStyles()}>
                    {leftBar}

                    <div style={this.getContentAreaStyles()}>
                        {children}
                    </div>

                    {rightBar}
                </div>

                {bottomBar}
            </div>
        );
    }

    private getContainerStyles(theme: Theme, customStyle?: CSSProperties): CSSProperties {
        return {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: theme.colors.neutral.panelBackground,
            color: theme.colors.neutral.text,
            fontFamily: theme.typography.font.family,
            overflow: 'hidden',
            ...customStyle
        };
    }

    private getMainRowStyles(): CSSProperties {
        return {
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            overflow: 'hidden'
        };
    }

    private getContentAreaStyles(): CSSProperties {
        return {
            flex: 1,
            position: 'relative',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column'
        };
    }
}


export default Workspace;
