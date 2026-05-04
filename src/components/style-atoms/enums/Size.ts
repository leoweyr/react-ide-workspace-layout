export const Size = {
    SMALL: 'SMALL',
    MEDIUM: 'MEDIUM',
    LARGE: 'LARGE',
} as const;


export type Size = typeof Size[keyof typeof Size];
