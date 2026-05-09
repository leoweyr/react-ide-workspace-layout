export const SideBarSection = {
    TOP: 'top',
    BOTTOM: 'bottom',
} as const;


export type SideBarSection = typeof SideBarSection[keyof typeof SideBarSection];
