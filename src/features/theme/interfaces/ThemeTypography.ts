interface ThemeTypography {
    font: {
        family: string;
        codeFamily: string;
        sizeMedium: string;
        sizeSmall: string;
        sizeLarge: string;
        sizeExtraLarge: string;
        weight?: string | number;
    };
    line: {
        height: string;
    };
}


export default ThemeTypography;
