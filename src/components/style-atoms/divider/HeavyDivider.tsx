import { Component, ReactNode, CSSProperties } from 'react';

import Divider from './Divider';
import { Theme } from '../../../features';


interface HeavyDividerProps {
    className?: string;
    style?: CSSProperties;
}


class HeavyDivider extends Component<HeavyDividerProps> {
    public render(): ReactNode {
        const theme: Theme = Theme.getInstance();

        return (
            <Divider
                thickness={1.5}  // Manually aligned with IDEA dimensions.
                color={theme.colors.neutral.border}
                style={this.getStyles()}
                className={this.props.className}
            />
        );
    }

    private getStyles(): CSSProperties {
        const { style }: HeavyDividerProps = this.props;

        return {
            marginTop: '1.5px',  // Manually aligned with IDEA dimensions.
            marginBottom: '1.5px',  // Manually aligned with IDEA dimensions.
            opacity: 0.74,  // Make color match #DCDDDF.
            ...style
        };
    }
}


export default HeavyDivider;
