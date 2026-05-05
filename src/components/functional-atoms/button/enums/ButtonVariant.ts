export const ButtonVariant = {
    /**
     * Represents the primary action in a view, such as 'Save' or 'Submit'.
     * It has high visual prominence, typically using the theme's selection color as its background.
     */
    PRIMARY: 'PRIMARY',

    /**
     * The standard button variant used for general actions, featuring a border and a distinct background.
     */
    DEFAULT: 'DEFAULT',

    /**
     * Specifically designed for buttons containing only an icon, offering a compact and often equilateral clickable area.
     */
    ICON: 'ICON',

    /**
     * A subtle variant that remains transparent by default and reveals its background only upon interaction (hover or active).
     * Ideal for secondary actions and toolbar integration.
     */
    GHOST: 'GHOST',
} as const;


export type ButtonVariant = typeof ButtonVariant[keyof typeof ButtonVariant];
