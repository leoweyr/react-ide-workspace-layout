export const SplitterOrientation = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal',
} as const;


export type SplitterOrientation= typeof SplitterOrientation[keyof typeof SplitterOrientation];
