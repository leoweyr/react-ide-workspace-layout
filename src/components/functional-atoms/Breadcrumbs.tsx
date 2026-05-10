import { 
    Component, 
    ReactNode, 
    CSSProperties, 
    ReactElement, 
    Fragment, 
    cloneElement 
} from 'react';

import { Theme } from '../../features/theme/Theme';
import { 
    JETBRAINS_ICONS, 
    Size 
} from '../style-atoms';
import { IconWithTextButton, TextButton } from './button';


interface BreadcrumbsProps {
    items: (ReactElement<any, typeof IconWithTextButton> | ReactElement<any, typeof TextButton>)[];
    size?: Size;
    className?: string;
    style?: CSSProperties;
}


class Breadcrumbs extends Component<BreadcrumbsProps> {
    public render(): ReactNode {
        const { items, className, style }: BreadcrumbsProps = this.props;
        const theme: Theme = Theme.getInstance();

        return (
            <div className={className} style={{ ...this.getContainerStyles(theme), ...style }}>
                {items.map((item: ReactElement<any, typeof IconWithTextButton> | ReactElement<any, typeof TextButton>, index: number): ReactNode => (
                    <Fragment key={index}>
                        {this.renderItem(item)}
                        {index < items.length - 1 && this.renderSeparator(theme)}
                    </Fragment>
                ))}
            </div>
        );
    }

    private renderItem(item: ReactElement<any, typeof IconWithTextButton> | ReactElement<any, typeof TextButton>): ReactNode {
        const { size=Size.MEDIUM }: BreadcrumbsProps = this.props;

        switch (size){
            case Size.SMALL:

                break;
            case Size.LARGE:

                break;
            case Size.MEDIUM:
            default:

                break;
        }

        return cloneElement(item, {
            size: size,
            style: {
                paddingLeft: '4px',
                paddingRight: '4px',
                ...item.props.style,
            },
        });
    }

    private renderSeparator(theme: Theme): ReactNode {
        return (
            <div style={this.getSeparatorStyles(theme)}>
                {cloneElement(JETBRAINS_ICONS.ChevronRight as ReactElement, {
                    size: Size.SMALL,
                    color: theme.colors.neutral.textSecondary,
                })}
            </div>
        );
    }

    private getContainerStyles(theme: Theme): CSSProperties {
        return {
            display: 'flex',
            alignItems: 'center',
            height: '24px',
            padding: `0 ${theme.layout.spacing.small}px`,
        };
    }

    private getSeparatorStyles(theme: Theme): CSSProperties {
        return {
            display: 'flex',
            alignItems: 'center',
            margin: `0 0px`,
            opacity: 0.6,
        };
    }
}


export default Breadcrumbs;
