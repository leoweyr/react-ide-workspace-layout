export const ComponentStyle = {
    REGULAR: 'regular',
    SMALL: 'small',
    LARGE: 'large',
} as const;


export type ComponentStyle = typeof ComponentStyle[keyof typeof ComponentStyle];
