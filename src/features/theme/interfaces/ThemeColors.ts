interface ThemeColors {
    neutral: {
        background: string;
        panelBackground: string;
        editorBackground: string;
        text: string;
        textSecondary: string;
        border: string;
    };
    selection: {
        background: string;
    };
    button: {
        fill: string;
        fillHover: string;
    };
    input: {
        background: string;
        border: string;
    };
    checkbox: {
        background: string;
        border: string;
        checked: string;
    };
    tab: {
        activeBackground: string;
        inactiveBackground: string;
        activeUnderline: string;
    };
    progressBar: {
        track: string;
        fill: string;
    };
    toolbar: {
        background: string;
    };
    tooltip: {
        background: string;
        text: string;
        border: string;
    };
    status: {
        success: string;
        warning: string;
        error: string;
    };
    attention: {
        focus: string;
        unfocus: string;
    };
}


export default ThemeColors;
