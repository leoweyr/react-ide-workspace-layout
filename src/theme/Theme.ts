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
    tabActive: string;
    tabInactive: string;
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
        background: '#3c3f41',
        panelBackground: '#3c3f41',
        editorBackground: '#2b2b2b',
        text: '#bbbbbb',
        textSecondary: '#808080',
        border: '#646464',
        selection: '#2f65ca',
        button: '#4c5052',
        buttonHover: '#5c6164',
        inputBackground: '#45494a',
        inputBorder: '#646464',
        tabActive: '#2b2b2b',
        tabInactive: '#3c3f41',
        toolbar: '#3c3f41',
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
        lineHeight: '1.5',
        codeFontFamily: '"JetBrains Mono", "Fira Code", monospace',
    };

    private constructor() {}
}
