export const ExtensionDirection = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
} as const;


export type ExtensionDirection = typeof ExtensionDirection[keyof typeof ExtensionDirection];
