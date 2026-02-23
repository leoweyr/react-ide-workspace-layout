export const ToolbarOrientation = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical',
} as const;


export type ToolbarOrientation = typeof ToolbarOrientation[keyof typeof ToolbarOrientation];
