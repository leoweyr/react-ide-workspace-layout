export const Orientation = {
    HORIZONTAL: 'HORIZONTAL',
    VERTICAL: 'VERTICAL',
} as const;


export type Orientation = typeof Orientation[keyof typeof Orientation];
