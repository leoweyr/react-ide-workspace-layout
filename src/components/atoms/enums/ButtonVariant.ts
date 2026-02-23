export const ButtonVariant = {
    PRIMARY: 'primary',
    DEFAULT: 'default',
    ICON: 'icon',
    GHOST: 'ghost',
} as const;


export type ButtonVariant= typeof ButtonVariant[keyof typeof ButtonVariant];
