interface ThemeLayout {
    spacing: {
        extraSmall: number;
        small: number;
        medium: number;
        large: number;
        extraLarge: number;
    };
    sizing: {
        common: {
            borderRadius: string;
            borderWidth: string;
        };
        bars: {
            topHeight: number;
            bottomHeight: number;
            sideWidth: number;
        };
    };
}


export default ThemeLayout;
