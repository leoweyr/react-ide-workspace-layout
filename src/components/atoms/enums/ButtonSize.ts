export const ButtonSize = {
    SMALL: 'sm',
    MEDIUM: 'md',
    LARGE: 'lg',
} as const;


export type ButtonSize = typeof ButtonSize[keyof typeof ButtonSize];
