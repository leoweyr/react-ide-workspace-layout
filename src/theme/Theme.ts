export interface ThemeColors {
    background: string;
    panelBackground: string;
    editorBackground: string;
    text: string;
    textSecondary: string;
    border: string;
    selection: string;
    button: string;
    buttonHover: string;
    inputBackground: string;
    inputBorder: string;
    checkboxBackground: string;
    checkboxBorder: string;
    checkboxChecked: string;
    tabActive: string;
    tabInactive: string;
    progressBarBackground: string;
    progressBarForeground: string;
    toolbar: string;
    success: string;
    warning: string;
    error: string;
}


export interface ThemeSpacing {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
}


export interface ThemeTypography {
    fontFamily: string;
    fontSize: string;
    fontSizeSmall: string;
    fontSizeLarge: string;
    lineHeight: string;
    codeFontFamily: string;
    fontWeight?: string | number;
}


export class Theme {
    private static instance: Theme;

    public static getInstance(): Theme {
        if (!Theme.instance) {
            Theme.instance = new Theme();
        }

        return Theme.instance;
    }

    public readonly colors: ThemeColors = {
        background: '#f2f2f2', // panel / grey15
        panelBackground: '#f2f2f2', // panel / grey15
        editorBackground: '#ffffff', // contentBackground / white
        text: '#000000', // foreground / black
        textSecondary: '#8c8c8c', // disabledForeground / grey03 (or grey02 #808080)
        border: '#d1d1d1', // border / grey09
        selection: '#2675bf', // selectionBackground
        button: '#ffffff', // standard light button
        buttonHover: '#dfdfdf', // grey12 (ActionButton.hoverBackground)
        inputBackground: '#ffffff', // contentBackground / white
        inputBorder: '#c4c4c4', // componentBorder / grey08
        checkboxBackground: '#ffffff', // contentBackground
        checkboxBorder: '#c4c4c4', // componentBorder
        checkboxChecked: '#2675bf', // selectionBackground
        tabActive: '#ffffff', // EditorTabs.underlinedTabBackground
        tabInactive: '#f2f2f2', // panel
        progressBarBackground: '#c4c4c4', // grey08 (approx track)
        progressBarForeground: '#2675bf', // selectionBackground
        toolbar: '#f2f2f2', // panel
        success: '#629755',
        warning: '#bf8803',
        error: '#cc0000',
    };

    public readonly spacing: ThemeSpacing = {
        xs: 2,
        sm: 4,
        md: 8,
        lg: 12,
        xl: 16,
    };

    public readonly typography: ThemeTypography = {
        fontFamily: '"Segoe UI", "Inter", "Roboto", sans-serif',
        fontSize: '12px',
        fontSizeSmall: '10px',
        fontSizeLarge: '14px',
        lineHeight: '1.5',
        codeFontFamily: '"JetBrains Mono", "Fira Code", monospace',
    };

    private constructor() {}
}
