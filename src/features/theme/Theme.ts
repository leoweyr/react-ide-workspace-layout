import ThemeColors from './interfaces/ThemeColors';
import ThemeTypography from './interfaces/ThemeTypography';
import ThemeLayout from './interfaces/ThemeLayout';
import ThemeScheme from './interfaces/ThemeScheme';
import Light from './schemes/Light.json';


export class Theme {
    private static instance: Theme;

    private currentTheme: ThemeScheme;

    public static getInstance(): Theme {
        if (!Theme.instance) {
            Theme.instance = new Theme();
        }

        return Theme.instance;
    }

    private constructor() {
        this.currentTheme = Light as ThemeScheme;
    }

    public get colors(): ThemeColors {
        return this.currentTheme.colors;
    }

    public get typography(): ThemeTypography {
        return this.currentTheme.typography;
    }

    public get layout(): ThemeLayout {
        return this.currentTheme.layout;
    }

    public setTheme(scheme: ThemeScheme): void {
        this.currentTheme = scheme;
    }
}
