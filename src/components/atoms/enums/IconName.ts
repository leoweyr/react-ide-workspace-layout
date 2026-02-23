export const IconName = {
    CLOSE: 'close',
    EXPAND: 'expand',
    COLLAPSE: 'collapse',
    FOLDER: 'folder',
    FILE: 'file',
    SEARCH: 'search',
    SETTINGS: 'settings',
    MENU: 'menu',
} as const;


export type IconName= typeof IconName[keyof typeof IconName];
