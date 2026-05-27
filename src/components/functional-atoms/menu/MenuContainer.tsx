import { Component, ReactNode, CSSProperties, ReactElement, cloneElement, isValidElement } from 'react';

import MenuItem from './MenuItem';
import HeavyDivider from '../../style-atoms/divider/HeavyDivider';
import LightDivider from '../../style-atoms/divider/LightDivider';


interface MenuContainerProps {
    items: ReactElement<any, typeof MenuItem | typeof HeavyDivider | typeof LightDivider>[];
    className?: string;
    style?: CSSProperties;
}


class MenuContainer extends Component<MenuContainerProps> {
    public render(): ReactNode {
        const { items, className, style }: MenuContainerProps = this.props;

        return (
            <div className={className} style={this.getContainerStyles(style)}>
                {this.renderItems(items)}
            </div>
        );
    }

    private renderItems(items: ReactElement<any, typeof MenuItem | typeof HeavyDivider | typeof LightDivider>[]): ReactNode[] {
        return items.map((item: ReactElement<any, typeof MenuItem | typeof HeavyDivider | typeof LightDivider>, index: number): ReactNode => {
            if (isValidElement(item)) {
                const key: string = item.key || index.toString();
                const isDivider: boolean = item.type === HeavyDivider || item.type === LightDivider;

                if (isDivider) {
                    return (
                        <div key={key} style={{ margin: '0 -3.5px' }}>
                            {cloneElement(item as ReactElement<any>, {})}
                        </div>
                    );
                }

                return cloneElement(item as ReactElement<any>, { key });
            }

            return item;
        });
    }

    private getContainerStyles(customStyle?: CSSProperties): CSSProperties {
        return {
            display: 'inline-flex',  // Making the height the sum of all children.
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            border: `1.5px solid #B9BDC9`,  // Manually aligned with IDEA dimensions.
            borderRadius: '8px',  // Manually aligned with IDEA dimensions.
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
            padding: `6px 3.5px`,  // Manually aligned with IDEA dimensions.
            boxSizing: 'border-box',
            ...customStyle,
        };
    }
}


export default MenuContainer;
