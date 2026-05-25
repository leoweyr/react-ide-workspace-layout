import { Component, ReactNode, CSSProperties } from 'react';

import Divider from './Divider';
import { Theme } from '../../../features';


interface LightDividerProps {
    className?: string;
    style?: CSSProperties;
}


class LightDivider extends Component<LightDividerProps> {
    public render(): ReactNode {
        const theme: Theme = Theme.getInstance();

        return (
            <Divider
                thickness={1}  // Manually aligned with IDEA dimensions.
                color={theme.colors.neutral.border}
                style={this.getStyles()}
                className={this.props.className}
            />
        );
    }

    private getStyles(): CSSProperties {
        const { style }: LightDividerProps = this.props;

        return {
            marginTop: '1.5px',  // Manually aligned with IDEA dimensions.
            marginBottom: '1.5px',  // Manually aligned with IDEA dimensions.
            opacity: 0.43,  // Make color match #EBECF0.
            ...style
        };
    }
}


export default LightDivider;
