import ThemeColors from './interfaces/ThemeColors';
import ThemeTypography from './interfaces/ThemeTypography';
import ThemeLayout from './interfaces/ThemeLayout';


export class Theme {
    private static instance: Theme;

    public static getInstance(): Theme {
        if (!Theme.instance) {
            Theme.instance = new Theme();
        }

        return Theme.instance;
    }

    public readonly colors: ThemeColors = {
        neutral: {
            background: '#f2f2f2',
            panelBackground: '#f2f2f2',
            editorBackground: '#ffffff',
            text: '#000000',
            textSecondary: '#8c8c8c',
            border: '#d1d1d1',
        },
        selection: {
            background: '#2675bf',
        },
        button: {
            fill: '#ffffff',
            fillHover: '#dfdfdf',
        },
        input: {
            background: '#ffffff',
            border: '#c4c4c4',
        },
        checkbox: {
            background: '#ffffff',
            border: '#c4c4c4',
            checked: '#2675bf',
        },
        tab: {
            activeBackground: '#ffffff',
            inactiveBackground: '#f2f2f2',
            activeUnderline: '#2675bf',
        },
        progressBar: {
            track: '#c4c4c4',
            fill: '#2675bf',
        },
        toolbar: {
            background: '#f2f2f2',
        },
        status: {
            success: '#629755',
            warning: '#bf8803',
            error: '#cc0000',
        },
    };

    public readonly typography: ThemeTypography = {
        font: {
            family: '"Segoe UI", "Inter", "Roboto", sans-serif',
            codeFamily: '"JetBrains Mono", "Fira Code", monospace',
            size: '12px',
            sizeSmall: '10px',
            sizeLarge: '14px',
        },
        line: {
            height: '1.5',
        },
    };

    public readonly layout: ThemeLayout = {
        spacing: {
            extraSmall: 2,
            small: 4,
            medium: 8,
            large: 12,
            extraLarge: 16,
        },
        sizing: {
            common: {
                borderRadius: '3px',
                borderWidth: '1px',
            },
            bars: {
                topHeight: 40,
                bottomHeight: 24,
                sideWidth: 36,
            },
        },
    };

    private constructor() {}
}
